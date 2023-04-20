// // import { prisma } from '../prismaSeedClient';

// export class TaskAssigneesSeeds {
//   static async execute() {
//     for (let i = 0; i < 10; i++) {
//       const taskAssignee = await prisma.tasksAssignees.create({
//         data: {
//           uuid: `0${i + 1}`,
//           task_uuid: `0${i + 1}`,
//           user_uuid: `0${i + 1}`,
//         },
//       });
//       console.log(`Created taskAssignee with id: ${taskAssignee.uuid}`);
//     }
//   }
// }
