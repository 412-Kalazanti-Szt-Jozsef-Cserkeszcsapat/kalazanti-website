# Támogatás feature

The route entry point stays at `tamogatas.ts`. Everything specific to donations lives inside this feature; components are not promoted to a global shared folder without another consumer.

## Responsibilities

- `tamogatas.*`: page composition, layout, and the lifetime of the feature-scoped `DonationStore`.
- `state/donation.store.ts`: selected project, amounts, frequency, consent, loading and checkout state. `canSubmit` and `submit` enforce the same business requirements. Pending requests are cancelled on destruction.
- `services/donation.service.ts`: HTTP transport using the application API configuration.
- `models/donation.model.ts`: API request and response contracts.
- `config/donation.config.ts`: preset amounts, minimum amount, fallback projects and foundation details.
- `utils/`: pure amount parsing/formatting/caret helpers and checkout error translation.
- `components/donation-options`: composes the project selector, amount input and frequency controls.
- `components/donation-project-select`: accessible CDK menu with inputs and a selected-ID model.
- `components/donation-amount-input`: formatted text editing, native validity and cursor handling; exposes a numeric model.
- `components/donation-checkout`: summary, consent and submit button.
- `components/payment-methods`: payment logos.
- `components/alternative-donations`: transfer/tax details and clipboard feedback.

Styles and interaction animations are colocated with the component that owns the markup. The page owns the two-column layout. Reduced-motion handling is retained. Hungarian locale data is registered once in the application configuration.

The pre-existing offline fallback projects and dual `donate_type` / `donate_type_id` checkout fields are preserved for compatibility. The fallback policy must be reviewed together with the backend if project IDs change.

## Validation

```sh
npm run build
npm test -- --watch=false --include='src/app/features/tamogatas/**/*.spec.ts'
```

For UI changes, also check the project selector with keyboard navigation, custom amount typing/pasting/deletion, minimum and consent gating, monthly summary, narrow viewports and reduced motion. Checkout verification must intercept the POST rather than initiate a real payment.
