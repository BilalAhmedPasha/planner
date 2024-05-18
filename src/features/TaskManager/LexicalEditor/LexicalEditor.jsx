import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import ExampleTheme from "./theme/SampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import "./theme/SampleTheme.css"

function Placeholder() {
  return <div className="editor-placeholder">Enter description...</div>;
}

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  onError(error) {
    throw error;
  },
  theme: ExampleTheme,
};

export default function App() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CheckListPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
