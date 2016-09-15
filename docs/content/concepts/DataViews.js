import {Md} from '../../components/Md';
import {CodeSplit} from '../../components/CodeSplit';
import {CodeSnippet} from '../../components/CodeSnippet';

import {HtmlElement} from 'cx/ui/HtmlElement';
import {Content} from 'cx/ui/layout/Content';
import {Checkbox} from 'cx/ui/form/Checkbox';
import {TextField} from 'cx/ui/form/TextField';
import {Select, Option} from 'cx/ui/form/Select';
import {Radio} from 'cx/ui/form/Radio';
import {LabelsLeftLayout} from 'cx/ui/layout/LabelsLeftLayout';
import {store} from '../../app/store';
import {Repeater} from 'cx/ui/Repeater';
import {Sandbox} from 'cx/ui/Sandbox';
import {Text} from 'cx/ui/Text';
import {Controller} from 'cx/ui/Controller';

store.set('intro.core.items', [
    {text: 'A', checked: false},
    {text: 'B', checked: false},
    {text: 'C', checked: false}
]);

export const DataViews = <cx>

    <Md>
        # Data Views

        Having all data in a single object means that sometimes it's hard to access a particular object or a property.
        The purpose of data views it to simplify that.

        <CodeSplit>

            ## Repeater

            One of the most commonly used data views is the `ExposedRecordView` used
            by `Repeater` and `Grid` controls. It exposes a single element from an array as a separate store property
            (`$record`) and also the element's index under the `$index` property.

            <div class="widgets">
                <div>
                    <Repeater records:bind="intro.core.items">
                        <div>
                            <Checkbox value:bind="$record.checked" text:bind="$record.text"/>
                        </div>
                    </Repeater>

                    You checked <Text value:expr='{intro.core.items}.filter(a=>a.checked).length'/> item(s).
                </div>
            </div>

            <Content name="code">
                <CodeSnippet>{`
               store.set('intro.core.items', [
                  { text: 'A', checked: false },
                  { text: 'B', checked: false },
                  { text: 'C', checked: false }
               ]);
               ...
               <Repeater records:bind="intro.core.items">
                  <Checkbox value:bind="$record.checked" text:bind="$record.text" />
                  <br/>
               </Repeater>

               You checked <Text value:expr='{intro.core.items}.filter(a=>a.checked).length' /> item(s).
            `}</CodeSnippet>
            </Content>
        </CodeSplit>

        <CodeSplit>

            ## Sandbox

            The `Sandbox` control works as a data multiplexer. It selects a value pointed by the `key` from the
            `storage` object and exposes it as a new property (`$page`).

            <div class="widgets">
                <div>
                    <div preserveWhitespace>
                        <Radio value={{bind: "$page.place", defaultValue: "winner"}} option="winner">Winner</Radio>
                        <Radio value:bind="$page.place" option="second">2nd Place</Radio>
                        <Radio value:bind="$page.place" option="third">3rd Place</Radio>
                    </div>

                    <hr/>

                    <Sandbox key:bind="$page.place" storage:bind="$page.results" recordName="$contestant">
                        <div layout={LabelsLeftLayout}>
                            <TextField value:bind="$contestant.firstName" label="First Name"/>
                            <TextField value:bind="$contestant.lastName" label="Last Name"/>
                        </div>
                    </Sandbox>
                </div>
                <div style="width:200px">
                    <strong>Results</strong>

                    <div>
                        1. <Text tpl="{$page.results.winner.firstName} {$page.results.winner.lastName}"/>
                    </div>
                    <div>
                        2. <Text tpl="{$page.results.second.firstName} {$page.results.second.lastName}"/>
                    </div>
                    <div>
                        3. <Text tpl="{$page.results.third.firstName} {$page.results.third.lastName}"/>
                    </div>
                </div>
            </div>

            <CodeSnippet putInto="code">{`
                <div>
                    <div preserveWhitespace>
                        <Radio value={{bind:"$page.place", defaultValue:"winner"}} option="winner">Winner</Radio>
                        <Radio value:bind="$page.place" option="second">2nd Place</Radio>
                        <Radio value:bind="$page.place" option="third">3rd Place</Radio>
                    </div>

                    <hr/>

                    <Sandbox key:bind="$page.place" storage:bind="$page.results" recordName="$info">
                        <div layout={LabelsLeftLayout}>
                            <TextField value:bind="$info.firstName" label="First Name" />
                            <TextField value:bind="$info.lastName" label="Last Name" />
                        </div>
                    </Sandbox>
                </div>
                <div>
                    <strong>Results</strong>

                    <div>
                        1. <Text tpl="{$page.results.winner.firstName} {$page.results.winner.lastName}" />
                    </div>
                    <div>
                        2. <Text tpl="{$page.results.second.firstName} {$page.results.second.lastName}" />
                    </div>
                    <div>
                        3. <Text tpl="{$page.results.third.firstName} {$page.results.third.lastName}" />
                    </div>
                </div>
            `}</CodeSnippet>

            `Sandbox` is commonly used in single page applications to isolate data belonging to
            different pages identified by the URL address.

        </CodeSplit>
    </Md>
</cx>

