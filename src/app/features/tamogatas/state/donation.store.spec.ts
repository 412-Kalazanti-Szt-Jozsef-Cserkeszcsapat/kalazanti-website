import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Subject, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DonationStore } from './donation.store';
import { DonationService } from '../services/donation.service';
import { CheckoutSessionResponse } from '../models/donation.model';
import { FALLBACK_DONATION_TYPES } from '../config/donation.config';

describe('DonationStore', () => {
  const types = [{ id: 7, title: 'Táborok', description: 'Nyári táborok' }];
  let store: DonationStore;
  let checkout: Subject<CheckoutSessionResponse>;
  let api: {
    getDonateTypes: ReturnType<typeof vi.fn>;
    createCheckoutSession: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    checkout = new Subject<CheckoutSessionResponse>();
    api = {
      getDonateTypes: vi.fn(() => of(types)),
      createCheckoutSession: vi.fn(() => checkout),
    };
    TestBed.configureTestingModule({
      providers: [DonationStore, { provide: DonationService, useValue: api }],
    });
    store = TestBed.inject(DonationStore);
    store.loadTypes();
  });

  it('requires consent, a valid amount and a known project', () => {
    store.submit();
    expect(api.createCheckoutSession).not.toHaveBeenCalled();
    store.consentAccepted.set(true);
    store.selectAmount('custom');
    store.customAmount.set(411);
    store.submit();
    expect(api.createCheckoutSession).not.toHaveBeenCalled();
    store.customAmount.set(412);
    expect(store.canSubmit()).toBe(true);
    store.selectedTypeId.set(999);
    store.submit();
    expect(api.createCheckoutSession).not.toHaveBeenCalled();
  });

  it('sends numeric amounts and prevents duplicate pending submissions', () => {
    store.consentAccepted.set(true);
    store.selectAmount('custom');
    store.customAmount.set(25000);
    store.selectFrequency('recurring');
    store.submit();
    store.submit();
    expect(api.createCheckoutSession).toHaveBeenCalledExactlyOnceWith({
      amount: 25000,
      payment_type: 'recurring',
      donate_type: 7,
      donate_type_id: 7,
    });
    expect(store.isSubmitting()).toBe(true);
    checkout.error(new HttpErrorResponse({ status: 422 }));
    expect(store.isSubmitting()).toBe(false);
    expect(store.checkoutError()).toContain('412');
    expect(store.canSubmit()).toBe(true);
  });

  it('preserves fallback projects when loading fails', () => {
    api.getDonateTypes.mockReturnValue(throwError(() => new Error('offline')));
    store.loadTypes();
    expect(store.donateTypes()).toEqual(FALLBACK_DONATION_TYPES);
    expect(store.selectedTypeId()).toBe(FALLBACK_DONATION_TYPES[0].id);
    expect(store.isTypesLoading()).toBe(false);
  });

  it('does not enable checkout when the server returns no projects', () => {
    api.getDonateTypes.mockReturnValue(of([]));
    store.loadTypes();
    store.consentAccepted.set(true);
    expect(store.selectedTypeId()).toBeNull();
    expect(store.canSubmit()).toBe(false);
  });

  it('reports a missing checkout URL and releases the pending state', () => {
    store.consentAccepted.set(true);
    store.submit();
    checkout.next({ checkout_url: '' });
    checkout.complete();
    expect(store.checkoutError()).toContain('Nem sikerült');
    expect(store.isSubmitting()).toBe(false);
  });

  it('cancels subscriptions when the feature is destroyed', () => {
    store.consentAccepted.set(true);
    store.submit();
    expect(checkout.observed).toBe(true);
    TestBed.resetTestingModule();
    expect(checkout.observed).toBe(false);
  });
});
