import { FontLinks } from "@rrflow/ui";
import { createPortal } from "react-dom";

export const HeadInjector = () => createPortal(<FontLinks />, document.head);
