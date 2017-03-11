import {Widget, VDOM} from '../ui/Widget';
import {BoundedObject} from './BoundedObject';
import {Rect} from './util/Rect';
import {ResizeManager} from '../ui/ResizeManager';

export class Svg extends BoundedObject {

   initState(context, instance) {
      var size = {
         width: 0,
         height: 0
      };
      instance.size = size;
      instance.state = {size};
   }

   explore(context, instance) {
      var {size} = context.options;
      if (size) {
         instance.size = size;
         instance.shouldUpdate = true;
         instance.setState({size});
      }
      super.explore(context, instance);
   }

   prepare(context, instance) {
      var size = instance.size;
      var {parentRect, addClipRect} = context;
      context.parentRect = new Rect({
         l: 0,
         t: 0,
         r: size.width,
         b: size.height
      });
      instance.clipRects = {};
      instance.clipRectId = 0;
      context.addClipRect = rect => {
         var id = `clip-${++instance.clipRectId}`;
         instance.clipRects[id] = rect;
         return id;
      };
      super.prepare(context, instance);
      context.parentRect = parentRect;
      context.addClipRect = addClipRect;
   }

   render(context, instance, key) {
      if (context.options.size)
         return this.renderChildren(context, instance);

      return (
         <SvgComponent
            key={key}
            instance={instance}
            data={instance.data}
            options={context.options}
            shouldUpdate={instance.shouldUpdate}
         >
         {this.renderChildren(context, instance)}
         </SvgComponent>
      )
   }

   cleanup(context, instance) {
      super.cleanup(context, instance);

      if (context.options.size) {
         //invalidate cache if only inner content was rendered
         delete instance.cached.vdom;
      }
   }
}

Svg.prototype.pure = false;
Svg.prototype.anchors = '0 1 1 0';
Svg.prototype.baseClass = 'svg';
Svg.prototype.autoWidth = false;
Svg.prototype.autoHeight = false;
Svg.prototype.aspectRatio = 1.618;

function sameSize(a, b) {
   if (!a || !b)
      return false;

   return a.width == b.width && a.height == b.height;
}

class SvgComponent extends VDOM.Component {

   constructor(props) {
      super(props);
      this.state = {
         size: props.instance.size
      };
   }

   render() {
      var {instance, data} = this.props;
      var {size, widget} = instance;

      var children;
      if (size && sameSize(this.state.size, size))
         children = this.props.children;
      else if (this.state.size)
         children = Widget.renderInstance(instance, {size: this.state.size});

      var defs = [];
      for (var k in instance.clipRects) {
         let cr = instance.clipRects[k];
         defs.push(<clipPath key={k} id={k}>
            <rect x={cr.l} y={cr.t} width={Math.max(0, cr.width())} height={Math.max(0, cr.height())}/>
         </clipPath>);
      }

      let style = data.style;
      if (widget.autoHeight)
         style = {
            ...style,
            height: `${this.state.size.height}px`
         };
      if (widget.autoWidth)
         style = {
            ...style,
            width: `${this.state.size.width}px`
         };

      return <svg ref={el=>{this.svg = el}} className={data.classNames} style={style}>
         <defs>
            {defs}
         </defs>
         {children}
      </svg>
   }

   shouldComponentUpdate(props) {
      return props.shouldUpdate;
   }

   onResize() {

      let { widget } = this.props.instance;

      var bounds = this.svg.getBoundingClientRect();
      var size = {
         width: bounds.width,
         height: bounds.height
      };

      if (widget.autoHeight)
         size.height = size.width / widget.aspectRatio;

      if (widget.autoWidth)
         size.width = size.height * widget.aspectRatio;

      if (!sameSize(this.state.size, size))
         this.setState({
            size: size
         });
   }

   componentDidMount() {
      this.offResize = ResizeManager.subscribe(::this.onResize);
      this.onResize();
   }

   componentDidUpdate() {
      this.onResize();
   }

   componentWillUnmount() {
      if (this.offResize) {
         this.offResize();
         delete this.offResize;
      }
   }
}

Widget.alias('svg', Svg);