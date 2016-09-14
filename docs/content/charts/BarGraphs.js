import {Md} from 'docs/components/Md';
import {CodeSplit} from 'docs/components/CodeSplit';
import {CodeSnippet} from 'docs/components/CodeSnippet';
import {ConfigTable} from 'docs/components/ConfigTable';

import {HtmlElement} from 'cx/ui/HtmlElement';
import {Controller} from 'cx/ui/Controller';

import {Svg} from 'cx/ui/svg/Svg';
import {Gridlines} from 'cx/ui/svg/charts/Gridlines';
import {NumericAxis} from 'cx/ui/svg/charts/axis/NumericAxis';
import {CategoryAxis} from 'cx/ui/svg/charts/axis/CategoryAxis';
import {Chart} from 'cx/ui/svg/charts/Chart';
import {BarGraph} from 'cx/ui/svg/charts/BarGraph';
import {Legend} from 'cx/ui/svg/charts/Legend';
import {KeySelection} from 'cx/ui/selection/KeySelection';
import {casual} from 'docs/content/examples/data/casual';

import configs from './configs/BarGraph';

class PageController extends Controller {
   init() {
      super.init();
      var v1 = 100;
      var v2 = 110;
      this.store.set('$page.points', Array.from({length: 11}, (_, i) => ({
         y: casual.city,
         v1: v1 = (v1 + (Math.random() - 0.5) * 30),
         v2: v2 = (v2 + (Math.random() - 0.5) * 30)
      })));
   }
}


export const BarGraphs = <cx>
   <Md>
      <CodeSplit>
         # BarGraph

         The `BarGraph` widget is used to display a serie of horizontal bars.

         <div class="widgets" controller={PageController}>
            <Svg style="width:500px; height:400px;">
               <Chart offset="20 -20 -30 150" axes={{
                  x: { type: NumericAxis, snapToTicks: 1 },
                  y: { type: CategoryAxis, vertical: true }
               }}>
                  <Gridlines/>
                  <BarGraph data:bind="$page.points"
                               colorIndex={0}
                               name="V1"
                               size={0.3}
                               offset={-0.15}
                               xField="v1"
                               selection={{
                                  type: KeySelection,
                                  bind: '$page.selected.y',
                                  keyField: 'y'
                               }}
                  />

                  <BarGraph data:bind="$page.points"
                               colorIndex={6}
                               name="V2"
                               size={0.3}
                               offset={+0.15}
                               xField="v2"
                               selection={{
                                  type: KeySelection,
                                  bind: '$page.selected.y',
                                  keyField: 'y'
                               }}/>
               </Chart>
            </Svg>
            <Legend vertical />
         </div>

         <CodeSnippet putInto="code">{`
         class PageController extends Controller {
            init() {
               super.init();
               var v1 = 100;
               var v2 = 110;
               this.store.set('$page.points', Array.from({length: 11}, (_, i) => ({
                  y: casual.city,
                  v1: v1 = (v1 + (Math.random() - 0.5) * 30),
                  v2: v2 = (v2 + (Math.random() - 0.5) * 30)
               })));
            }
         }
         ...
         <div class="widgets" controller={PageController}>
            <Svg style="width:500px; height:400px;">
               <Chart offset="20 -20 -30 150" axes={{
                  x: { type: NumericAxis, snapToTicks: 1 },
                  y: { type: CategoryAxis, vertical: true }
               }}>
                  <Gridlines/>
                  <BarGraph data:bind="$page.points"
                               colorIndex={0}
                               name="V1"
                               size={0.3}
                               offset={-0.15}
                               xField="v1"
                               selection={{
                                  type: KeySelection,
                                  bind: '$page.selected.y',
                                  keyField: 'y'
                               }}
                  />

                  <BarGraph data:bind="$page.points"
                               colorIndex={6}
                               name="V2"
                               size={0.3}
                               offset={+0.15}
                               xField="v2"
                               selection={{
                                  type: KeySelection,
                                  bind: '$page.selected.y',
                                  keyField: 'y'
                               }}/>
               </Chart>
            </Svg>
            <Legend vertical />
         </div>
         `}</CodeSnippet>
      </CodeSplit>

      ## Configuration

      <ConfigTable props={configs} />

   </Md>
</cx>

