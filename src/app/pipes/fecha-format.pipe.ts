// // fecha-format.pipe.ts
// import { Pipe, PipeTransform } from '@angular/core';
// import { DatePipe } from '@angular/common';

// @Pipe({
//   name: 'formatFecha',
//   standalone: true,
  
// })
// export class FormatFechaPipe implements PipeTransform {
//   constructor(private datePipe: DatePipe) {}

//   transform(value: string | Date): string {
//     if (!value) return 'No disponible';
    
//     // Si es string en formato dd/MM/yyyy
//     if (typeof value === 'string' && value.includes('/')) {
//       const [day, month, year] = value.split('/');
//       value = new Date(`${year}-${month}-${day}`);
//     }
    
//     // Formatear a "12 Oct 2024"
//     return this.datePipe.transform(value, 'd MMM y') || 'Formato inválido';
//   }
// }
