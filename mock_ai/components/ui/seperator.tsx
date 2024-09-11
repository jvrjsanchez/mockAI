"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      ...props
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal"
          ? "h-[1px] w-full"
          : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

//  <div className="flex justify-center mb-6">
//             <Card className="bg-[#131538] p-2 w-full max-w-md aspect-video">
//               <video
//                 key={videoUrl}
//                 className="w-full h-full object-cover"
//                 ref={videoRef}
//                 muted
//                 controls={!isRecording}
//                 playsInline
//               >
//                 <source src={videoUrl} type="video/webm" />
//                 Your browser does not support the video tag.
//               </video>
//             </Card>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center">
//         <Button
//           onClick={handleToggleRecording}
//           className={`rounded-full p-4 ${
//             isRecording
//               ? "bg-[#ff6db3] hover:bg-[#ff6db3]/90"
//               : "bg-[#7fceff] hover:bg-[#7fceff]/90"
//           }`}
//           aria-label={
//             isRecording ? "Pause Recording" : "Start Recording"
//           }
//         >
//           {isRecording ? (
//             <Pause className="h-6 w-6" />
//           ) : mode === "video" ? (
//             <Video className="h-6 w-6" />
//           ) : (
//             <Mic className="h-6 w-6" />
//           )}
//         </Button>
//       </div>
