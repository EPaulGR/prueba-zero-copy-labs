import { Component, model, effect, signal, computed, ElementRef } from '@angular/core';
import { ParamsData } from '../../../../core/models/others/pagination.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  imports: [
    FormsModule,
  ],
})
export class PaginationComponent {
  elementosPag = model.required<boolean>(); // si es falso no se muestra el select de elementos por pág
  dataPagination = model.required<ParamsData>();
  totalPages = computed(() => Math.ceil(this.dataPagination().total / this.dataPagination().size));
  paginationRange = signal<string[]>([]);

  paginationCalc = effect(() => {
    if(this.dataPagination()) {
      const range: string[] = [];
      for (let i = 1; i <= this.totalPages(); i++) {
        if(this.dataPagination()) {
            const startItem = ((i - 1) * this.dataPagination().size) + 1;
            const endItem = Math.min(startItem + this.dataPagination().size - 1, this.dataPagination().total);
            range.push(`${startItem} - ${endItem}`);
        }
      }
      this.paginationRange.set(range);
    }
  });
  
  paginaAnterior(): void {
    if(this.dataPagination().page > 1) {
      this.dataPagination.update( (value) => {
        return {
          ...value,
          page: this.dataPagination().page - 1,
        }
      })
    } else {
      this.dataPagination.update( (value) => {
        return {
          ...value,
          page: this.totalPages(),
        }
      })
    }
  }

  paginaSiguiente(): void {
    if(this.dataPagination().page < this.totalPages()) {
      this.dataPagination.update( (value) => {
        return {
          ...value,
          page: this.dataPagination().page + 1,
        }
      })
    } else {
      this.dataPagination.update( (value) => {
        return {
          ...value,
          page: 1,
        }
      })
    }
  }

  cambiarPagina(page: number ): void {
    this.dataPagination.update( (value) => {
      return {
        ...value,
        page: +page,
      }
    })
  }

  cambiarSize(event: any): void {
    this.dataPagination.update( (value) => {
      return {
        ...value,
        page: 1,
        size: +event.target.value,
      }
    })
  }
}
