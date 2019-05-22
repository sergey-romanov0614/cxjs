import {PureContainer} from "./PureContainer";
import {Store} from '../data/Store';
import {Cx} from './Cx';
import {isString} from "../util/isString";
import {VDOM} from "./VDOM";
import {isFunction, isObject, isUndefined} from "../util";
import {Binding, getSelector} from "../data";

export class Restate extends PureContainer {

   declareData() {
      return super.declareData(...arguments, {
         deferredUntilIdle: undefined,
         idleTimeout: undefined
      })
   }

   init() {
      this.container = PureContainer.create({
         type: PureContainer,
         items: this.children || this.items,
         layout: this.layout,
         controller: this.controller,
         outerLayout: this.outerLayout,
         useParentLayout: this.useParentLayout,
         ws: this.ws
      });
      delete this.items;
      delete this.children;
      delete this.controller;
      delete this.outerLayout;
      delete this.layout;
      this.useParentLayout = true;
      super.init();
   }

   initInstance(context, instance) {
      instance.subStore = new RestateStore({
         store: instance.store,
         detached: this.detached,
         privateData: this.data || {},
         onSet: (path, value) => {
            let config = this.data[path];
            if (!config || (!config.bind && !config.set))
               throw new Error(`Cannot change ${path} in Restate as it's read-only. It's not a binding and it doesn't have a set function either.`);

            if (config.bind)
               return isUndefined(value) ? instance.store.deleteItem(config.bind) : instance.store.setItem(config.bind, value);

            if (isString(config.set))
               instance.getControllerMethod(config.set)(value, instance);
            else if (isFunction(config.set))
               config.set(value, instance);
            else
               throw new Error(`Cannot set value for ${path} in Restate as the setter is neither a function or a controller method.`);

            return true;
         }
      });

      instance.setStore = store => {
         instance.store = store;
         instance.subStore.setStore(store);
      };
   }

   explore(context, instance) {
      if (!this.detached) {
         instance.container = instance.getChild(context, this.container, "container", instance.subStore);
         instance.container.scheduleExploreIfVisible(context);
      }
      else {
         //check if data has changed
         instance.subStore.parentDataCheck();
      }
      super.explore(context, instance);
   }

   render(context, instance, key) {
      if (!this.detached)
         return instance.container.render(context);

      return <Cx
         key={key}
         widget={this.container}
         parentInstance={instance}
         store={instance.subStore}
         subscribe
         options={this.options}
         onError={this.onError}
         deferredUntilIdle={instance.data.deferredUntilIdle}
         idleTimeout={instance.data.idleTimeout}
      />
   }
}

Restate.prototype.detached = false;
Restate.prototype.waitForIdle = false;

class RestateStore extends Store {

   constructor(config) {
      super(config);
      this.dataSelector = getSelector(this.privateData);
      this.parentDataVersion = -1;
      if (this.dataSelector.memoize)
         this.dataSelector = this.dataSelector.memoize();
      this.parentDataCheck();
   }

   parentDataCheck() {
      if (this.parentDataVersion == this.store.meta.version)
         return;
      this.parentDataVersion = this.store.meta.version;
      this.parentData = this.dataSelector(this.store.getData());
      let changed = this.silently(() => {
         for (let key in this.parentData) {
            super.setItem(key, this.parentData[key]);
         }
      });
      if (changed)
         this.notify();
   }

   setItem(path, value) {
      let binding = Binding.get(path);
      let bindingRoot = binding.parts[0];
      if (!isObject(this.privateData) || !this.privateData.hasOwnProperty(bindingRoot)) {
         let changed = isUndefined(value)
            ? super.deleteItem(path)
            : super.setItem(path, value);
         if (changed && !this.detached)
            this.store.notify();
         return changed;
      }
      let newValue = value;
      if (binding.parts.length > 1)
         newValue = binding.set(this.getData(), value)[bindingRoot];
      this.onSet(bindingRoot, newValue);
      super.setItem(bindingRoot, newValue);
      this.parentDataCheck();
      return true;
   }

   deleteItem(path) {
      return this.setItem(path, undefined);
   }
}