/*eslint-disable*/
"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import ImageTool from "@editorjs/image";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import Code from "@editorjs/code";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";
// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import ColorPlugin from "editorjs-text-color-plugin";
import { uploadImage } from "../lib/utils";
import { useSession } from "next-auth/react";

interface EditorProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
  holder: string;
}

// Color collections for EditorJS color tools
const COLOR_COLLECTIONS = [
  "#c5143d",
  "#EC78FF",
  "#191EB5",
  "#00C8FF",
  "#198100",
  "#DCC000",
  "#000000",
  "#FFFFFF",
  "#E91E63",
];

// Helper function to validate and sanitize EditorJS data
const validateEditorData = (data?: OutputData): OutputData | undefined => {
  if (!data) return undefined;
  
  // If data has blocks array, validate it
  if (data.blocks && Array.isArray(data.blocks)) {
    // Filter out invalid blocks
    const validBlocks = data.blocks.filter((block) => {
      return (
        block &&
        typeof block === "object" &&
        block.type &&
        typeof block.type === "string" &&
        block.data &&
        typeof block.data === "object"
      );
    });
    
    // If no valid blocks, return undefined to let EditorJS create default
    if (validBlocks.length === 0) {
      return undefined;
    }
    
    return {
      ...data,
      blocks: validBlocks,
    };
  }
  
  // If structure is invalid, return undefined
  return undefined;
};

const EditorJSWrapper: React.FC<EditorProps> = ({ data, onChange, holder }) => {
  const ejInstance = useRef<EditorJS | null>(null);
  const { data: session } = useSession();
  const isInitializing = useRef(false);
  const dataRef = useRef<OutputData | undefined>(data);
  const onChangeRef = useRef(onChange);
  const sessionRef = useRef(session);
  const hasInitialized = useRef(false);

  // Update refs when props change
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  // Validate data before using it - memoize to prevent unnecessary recalculations
  const validatedData = useMemo(() => validateEditorData(data), [data]);

  // Update data ref when validated data changes
  useEffect(() => {
    dataRef.current = validatedData;
  }, [validatedData]);

  useEffect(() => {
    // Prevent multiple initializations
    if (hasInitialized.current || isInitializing.current || ejInstance.current) {
      return;
    }

    function initEditor() {
      if (isInitializing.current || ejInstance.current || hasInitialized.current) {
        return;
      }

      isInitializing.current = true;
      hasInitialized.current = true;

      try {
        const editor = new EditorJS({
          holder: holder,
          data: dataRef.current,
          onReady: () => {
            ejInstance.current = editor;
            isInitializing.current = false;
          },
          onChange: async () => {
            if (ejInstance.current && !isInitializing.current) {
              try {
                const content = await ejInstance.current.save();
                onChangeRef.current(content);
              } catch (error) {
                console.error("Error saving editor content:", error);
              }
            }
          },
          tools: {
            paragraph: {
              inlineToolbar: true,
            },
            header: {
              class: Header as any,
              inlineToolbar: true,
              config: {
                placeholder: "Enter a header",
                levels: [1, 2, 3, 4],
                defaultLevel: 2,
              },
            },
            list: {
              class: List as any,
              inlineToolbar: true,
            },
            image: {
              class: ImageTool as any,
              config: {
                uploader: {
                  uploadByFile: async (file: File) => {
                    const res = await uploadImage(file, sessionRef.current);
                    if (res.success) {
                      return {
                        success: 1,
                        file: {
                          url: `${process.env.NEXT_PUBLIC_HOST_URL}${res.data.url}`,
                        },
                      };
                    }
                    return { success: 0 };
                  },
                },
              },
            },
            quote: {
              class: Quote as any,
              inlineToolbar: true,
            },
            code: Code as any,
            inlineCode: InlineCode as any,
            embed: Embed as any,
            Color: {
              class: ColorPlugin as any,
              config: {
                colorCollections: COLOR_COLLECTIONS,
                defaultColor: "#c5143d",
                type: "text",
                customPicker: true,
              },
            },
            Marker: {
              class: ColorPlugin as any,
              config: {
                colorCollections: COLOR_COLLECTIONS,
                defaultColor: "#c822493d",
                type: "marker",
                icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.655 460.655" xml:space="preserve"><g><path d="M12.371,281.367c-13.064,13.064-13.064,34.246,0,47.31L131.97,448.28c13.064,13.064,34.246,13.064,47.31,0l51.589-51.589L109.281,271.1L12.371,281.367z"/><path d="M255.457,372.103l166.42-166.421c17.309-17.309,17.309-45.372,0-62.682l-91.047-91.047c-17.309-17.309-45.372-17.309-62.682,0l-166.42,166.42L255.457,372.103z"/></g></svg>`,
              },
            },
          },
        });
      } catch (error) {
        console.error("Error initializing editor:", error);
        isInitializing.current = false;
        hasInitialized.current = false;
      }
    }

    // Wait for the DOM element to be available
    const holderElement = document.getElementById(holder);
    if (!holderElement) {
      // Retry after a short delay if element is not ready
      const timeout = setTimeout(() => {
        const element = document.getElementById(holder);
        if (element && !hasInitialized.current && !ejInstance.current && !isInitializing.current) {
          initEditor();
        }
      }, 100);
      return () => clearTimeout(timeout);
    }

    initEditor();

    return () => {
      if (ejInstance.current) {
        try {
          ejInstance.current.destroy();
        } catch (error) {
          console.error("Error destroying editor:", error);
        }
        ejInstance.current = null;
        isInitializing.current = false;
        hasInitialized.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holder]);

  return (
    <div className="w-full bg-white border border-gray/30 rounded-md p-4 min-h-[400px]">
      <div id={holder} className="prose max-w-full" />
    </div>
  );
};

export default EditorJSWrapper;
