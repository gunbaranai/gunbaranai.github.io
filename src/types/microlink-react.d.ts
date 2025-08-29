declare module "@microlink/react" {
	import * as React from "react";

	type MediaKind = "image" | "screenshot" | "video" | "audio";
	type SizeKind = "small" | "normal" | "large";

	export interface MicrolinkProps extends React.HTMLAttributes<HTMLDivElement> {
		url: string;
		media?: MediaKind;
		size?: SizeKind;
		// Forward any unsupported props without strict typing
		[key: string]: any;
	}

	const Microlink: React.FC<MicrolinkProps>;
	export default Microlink;
}
