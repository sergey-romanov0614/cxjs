import {Md} from '../../components/Md';
import {CodeSplit} from '../../components/CodeSplit';
import {CodeSnippet} from '../../components/CodeSnippet';
import {ConfigTable} from '../../components/ConfigTable';
import {Content} from 'cx/ui/layout/Content';

import {HtmlElement} from 'cx/ui/HtmlElement';
import {Checkbox} from 'cx/ui/form/Checkbox';
import {TextField} from 'cx/ui/form/TextField';
import {DateField} from 'cx/ui/form/DateField';
import {TextArea} from 'cx/ui/form/TextArea';
import {Controller} from 'cx/ui/Controller';
import {Button} from 'cx/ui/Button';
import {Repeater} from 'cx/ui/Repeater';
import {LabelsLeftLayout} from 'cx/ui/layout/LabelsLeftLayout';

import {Window} from 'cx/ui/overlay/Window';
import {MsgBox} from 'cx/ui/overlay/MsgBox';

import configs from './configs/Window';



export const Windows = <cx>
   <Md>
      # Windows

      Windows are overlays with headers, footers and special appearance.

      <CodeSplit>
         <div class="widgets">
            <button type="button" onClick={(e, {store}) => { store.set('$page.contact.visible', true)}}>Open</button>
            <Window title="Contact"
                    visible={{ bind: "$page.contact.visible", defaultValue: false }}
                    center
                    style={{width: '500px'}}
                    modal>
               <div style={{padding: "20px"}} layout={{type: LabelsLeftLayout, mod: 'stretch'}}>
                  <TextField label="Name" value:bind="$page.contact.name" style={{width: '100%'}} tooltip="A Tooltip" />
                  <TextField label="Email" value:bind="$page.contact.email" style={{width: '100%'}}/>
                  <TextArea label="Message" value:bind="$page.contact.message" rows={10} style={{width: '100%'}}/>
                  <DateField label="Date" value:bind="$page.contact.date" />
               </div>
               <div putInto="footer" style={{float:"right"}} trimWhitespace={false}>
                  <Button mod="primary">Submit</Button>
                  <Button onClick={(e, ins) => { ins.parentOptions.dismiss() }}>
                     Cancel
                  </Button>
               </div>
            </Window>
         </div>

         <Content name="code">
            <CodeSnippet>{`
               <button type="button" onClick={(e, {store}) => { store.set('$page.contact.visible', true)}}>Open</button>
               <Window title="Contact"
                       visible={{ bind: "$page.contact.visible", defaultValue: false }}
                       center
                       style={{width: '500px'}}
                       modal>
                  <div style={{padding: "20px"}} layout={{type: LabelsLeftLayout, mod: 'stretch'}}>
                     <TextField label="Name" value:bind="$page.contact.name" style={{width: '100%'}} />
                     <TextField label="Email" value:bind="$page.contact.email" style={{width: '100%'}}/>
                     <TextArea label="Message" value:bind="$page.contact.message" rows={10} style={{width: '100%'}}/>
                     <DateField label="Date" value:bind="$page.contact.date" />
                  </div>
                  <div putInto="footer" style={{float:"right"}} trimWhitespace={false}>
                     <Button mod="primary">Submit</Button>
                     <Button onClick={(e, ins) => { ins.parentOptions.dismiss() }}>
                        Cancel
                     </Button>
                  </div>
               </Window>
            `}</CodeSnippet>
         </Content>

      </CodeSplit>

      ## Configuration

      <ConfigTable props={configs} />


   </Md>
</cx>