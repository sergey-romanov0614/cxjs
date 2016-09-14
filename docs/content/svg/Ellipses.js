import {Md} from '../../components/Md';
import {CodeSplit} from '../../components/CodeSplit';
import {CodeSnippet} from '../../components/CodeSnippet';
import {ConfigTable} from '../../components/ConfigTable';

import {HtmlElement} from 'cx/ui/HtmlElement';

import {Svg} from 'cx/ui/svg/Svg';
import {Ellipse} from 'cx/ui/svg/Ellipse';
import {Text} from 'cx/ui/svg/Text';

import configs from './configs/Rectangle';

export const Ellipses = <cx>
    <Md>
        # Ellipse

        Ellipse is a Cx version of SVG `ellipse` object which can be used in responsive scenarios.

        <CodeSplit>

            <div class="widgets">
                <Svg style="width:400px;height:400px;background:white" padding={5}>
                    <Ellipse margin={10} colorIndex={0}/>
                    <Ellipse margin={20} colorIndex={1}/>
                    <Ellipse margin={30} colorIndex={2}/>
                    <Ellipse margin={40} colorIndex={3}/>
                    <Ellipse margin={50} colorIndex={4}/>
                    <Ellipse margin={60} colorIndex={5}/>
                    <Ellipse margin={70} colorIndex={6}/>
                    <Ellipse margin={80} colorIndex={7}/>
                    <Ellipse margin={90} colorIndex={8}/>
                    <Ellipse margin={100} colorIndex={9}/>
                    <Ellipse margin={110} colorIndex={10}/>
                    <Ellipse margin={120} colorIndex={11}/>
                    <Ellipse margin={130} colorIndex={12}/>
                    <Ellipse margin={140} colorIndex={13}/>
                    <Ellipse margin={150} colorIndex={14}/>
                    <Ellipse margin={160} colorIndex={15}/>
                    <Ellipse margin={170} colorIndex={0}/>
                    <Ellipse margin={180} colorIndex={1}/>
                    <Ellipse margin={190} colorIndex={2}/>
                </Svg>
            </div>

            <CodeSnippet putInto="code">{`
            <Svg style="width:400px;height:400px;background:white" padding={5}>
               <Ellipse margin={10} colorIndex={0} />
               <Ellipse margin={20} colorIndex={1} />
               <Ellipse margin={30} colorIndex={2} />
               <Ellipse margin={40} colorIndex={3} />
               <Ellipse margin={50} colorIndex={4} />
               <Ellipse margin={60} colorIndex={5} />
               <Ellipse margin={70} colorIndex={6} />
               <Ellipse margin={80} colorIndex={7} />
               <Ellipse margin={90} colorIndex={8} />
               <Ellipse margin={100} colorIndex={9} />
               <Ellipse margin={110} colorIndex={10} />
               <Ellipse margin={120} colorIndex={11} />
               <Ellipse margin={130} colorIndex={12} />
               <Ellipse margin={140} colorIndex={13} />
               <Ellipse margin={150} colorIndex={14} />
               <Ellipse margin={160} colorIndex={15} />
            </Svg>
         `}</CodeSnippet>
        </CodeSplit>

        ## Configuration

        <ConfigTable props={configs}/>

    </Md>
</cx>

