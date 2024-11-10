// import React from "react";
// import { Plus, X } from "lucide-react";

// import { Button } from "@acme/ui/button";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@acme/ui/form";
// import { Input } from "@acme/ui/input";

// const QuestionInputs = ({ form }) => {
//   // const questions = form.watch("questions") || [""];

//   // const addQuestion = () => {
//   //   const currentQuestions = form.getValues("questions") || [];
//   //   if (currentQuestions.length < 5) {
//   //     form.setValue("questions", [...currentQuestions, ""]);
//   //   }
//   // };

//   // const removeQuestion = (index) => {
//   //   const currentQuestions = form.getValues("questions") || [];
//   //   if (currentQuestions.length > 1) {
//   //     const newQuestions = currentQuestions.filter((_, i) => i !== index);
//   //     form.setValue("questions", newQuestions);
//   //   }
//   // };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <FormLabel>
//           Questions <span className="text-red-500">*</span>
//         </FormLabel>
//         <Button
//           type="button"
//           variant="outline"
//           size="sm"
//           onClick={addQuestion}
//           disabled={questions.length >= 5}
//           className="h-8"
//         >
//           <Plus size={16} className="mr-1" />
//           Add Question
//         </Button>
//       </div>

//       {questions.map((_, index) => (
//         <FormField
//           key={index}
//           control={form.control}
//           name={`questions.${index}`}
//           render={({ field }) => (
//             <FormItem>
//               <div className="flex items-center gap-2">
//                 <FormControl>
//                   <Input
//                     placeholder={`Question ${index + 1}`}
//                     {...field}
//                     className="flex-1"
//                   />
//                 </FormControl>
//                 {questions.length > 1 && (
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeQuestion(index)}
//                     className="h-8 w-8 p-0"
//                   >
//                     <X size={16} />
//                   </Button>
//                 )}
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       ))}
//     </div>
//   );
// };

// export default QuestionInputs;
