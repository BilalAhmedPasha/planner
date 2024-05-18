import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  LuHighlighter,
  LuCheckSquare,
  LuList,
  LuListOrdered,
  LuLink,
  LuQuote,
} from "react-icons/lu";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
} from "react-icons/md";
import { MdOutlineBorderHorizontal } from "react-icons/md";

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsHighlight(selection.hasFormat("highlight"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <MdFormatBold style={{ fontSize: "1rem" }} />
      </button>

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <MdFormatItalic style={{ fontSize: "1rem" }} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <MdFormatUnderlined style={{ fontSize: "1rem" }} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <MdStrikethroughS style={{ fontSize: "1rem" }} />
      </button>

      <Divider />

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        }}
        className={"toolbar-item spaced " + (isHighlight ? "active" : "")}
        aria-label="Format Highlight"
      >
        <LuHighlighter style={{ fontSize: "1rem" }} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        }}
        className={"toolbar-item spaced " + (isHighlight ? "active" : "")}
        aria-label="Format Highlight"
      >
        <LuCheckSquare style={{ fontSize: "1rem" }} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        }}
        className={"toolbar-item spaced " + (isHighlight ? "active" : "")}
        aria-label="Format Highlight"
      >
        <LuList style={{ fontSize: "1rem" }} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        }}
        className={"toolbar-item spaced " + (isHighlight ? "active" : "")}
        aria-label="Format Highlight"
      >
        <LuListOrdered style={{ fontSize: "1rem" }} />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        }}
        className={"toolbar-item spaced " + (isHighlight ? "active" : "")}
        aria-label="Format Highlight"
      >
        <LuLink style={{ fontSize: "1rem" }} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        }}
        className={"toolbar-item spaced " + (isHighlight ? "active" : "")}
        aria-label="Format Highlight"
      >
        <LuQuote style={{ fontSize: "1rem" }} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
        }}
        className={"toolbar-item spaced " + (isHighlight ? "active" : "")}
        aria-label="Format Highlight"
      >
        <MdOutlineBorderHorizontal style={{ fontSize: "1rem" }} />
      </button>
    </div>
  );
}
