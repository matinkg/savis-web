import React, { useEffect, useRef } from "react";
import "./style.css";

interface EditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
}

function Editor({ onChange, editorLoaded, name, value }: EditorProps) {
  const editorRef = useRef<{ CKEditor?: any; ClassicEditor?: any }>({});
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [...ClassicEditor.builtinPlugins],
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "blockQuote",
              "|",
              "insertTable",
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "|",
              "undo",
              "redo",
              "|",
              "alignment",
              "direction",
            ],
            alignment: {
              options: ["left", "right", "center", "justify"],
            },
            language: {
              ui: "fa", // یا هر زبانی که برای راست‌چین کردن نیاز دارید
              content: "fa",
            },
            direction: "rtl",
            content: {
              direction: "rtl",
              language: "fa",
            },
          }}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Editor;
