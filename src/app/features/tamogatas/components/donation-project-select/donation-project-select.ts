import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { DonateType } from '../../models/donation.model';

@Component({
  selector: 'app-donation-project-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkMenuModule],
  templateUrl: './donation-project-select.html',
  styleUrl: './donation-project-select.css',
})
export class DonationProjectSelect {
  readonly types = input.required<readonly DonateType[]>();
  readonly loading = input(false);
  readonly selectedId = model<number | null>(null);
  readonly selectedType = computed(() =>
    this.types().find((type) => type.id === this.selectedId()),
  );
}
