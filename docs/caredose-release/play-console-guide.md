# CareDose: Play Console guide

Prepared 4 October 2026. These are recommendations for the audited offline implementation. Console labels can change; answer the actual questions for the final distributed build, all active versions and your real practices. Items explicitly marked pending are not approved declarations.

## Main listing and settings

| Field | Recommended value |
|---|---|
| App name | CareDose: Medicine Reminder — 27/30 characters |
| Short description | Medicine reminders and dose history for you and your family. Works offline. — 75/80 |
| Full description | `full-description.txt` — 2,923/4,000, excluding trailing file newline |
| App or game | App |
| Category | Medical (editorial recommendation based on medicine management; does not mean a regulated medical device) |
| Default listing language | English; use the English locale chosen in your Console consistently |
| Intended audience | Adults, including parents/caregivers. Select 18+ if this is the actual intended audience; child profiles do not make children the intended app users |
| Contains ads | No, for the audited build |
| In-app purchases/subscriptions | None implemented. Initial download price is the developer’s choice; free is recommended for this launch, not asserted from source code |
| Support email | arif991846@gmail.com |
| Website | https://www.arifz.xyz/apps/caredose/ — activate only after deployment |
| Privacy policy | https://www.arifz.xyz/privacy-policy/caredose.html — activate only after deployment |
| Package | xyz.arifz.caredose |
| Android support | Android 9+ based on minSdk 28 |
| Release notes | `whats-new.txt` for the first release |

Choose tags only from the real Console list and only where they fit medicine reminders/tracking. Do not invent free-form tags or add unrelated terms for traffic. Content rating is assigned through the questionnaire; do not predeclare “Everyone” or another final rating yourself. The offline app has no public user community, ads, purchases or location sharing in the inspected code; text handover through an external share chooser should be assessed using the questionnaire’s exact communication definition.

Sources: [listing fields](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en), [categories/tags](https://support.google.com/googleplay/android-developer/answer/9859673?hl=en).

## Health apps declaration

Declare **Medication and Treatment Management**. That is the relevant published category for medicine scheduling and reminders. Do not select “no health features” merely because processing is offline. No Health Connect or research-study functionality was found. No dose calculator, diagnosis or treatment recommendation is implemented.

The proposed positioning is a non-medical-device reminder/record tool. If the app is actually regulated or marketed as a medical device in a target jurisdiction, that requires a separate determination and supporting declaration; selecting the Medical store category alone does not settle it.

The full description includes the non-medical-device disclaimer and directs users to a healthcare professional. Keep claims in the app and promotional assets consistent with this. Avoid clinical performance or guaranteed adherence claims.

Sources: [health declaration](https://support.google.com/googleplay/android-developer/answer/14738291?hl=en), [health content requirements](https://support.google.com/googleplay/android-developer/answer/16679511?hl=en).

## App access / sign-in details

No sign-in, payment or externally issued key is required. Family profiles are local records, not online accounts. For a question asking whether any area is restricted by authentication/payment, the source supports **No**. Provide the demo instructions in `review-instructions.txt` wherever reviewer instructions are available. Do not invent credentials or declare an authentication wall merely to populate fields.

The fresh-install welcome screen has **Explore with sample data**. This gives reviewers example records without requiring a personal health profile. Use that path in any response if access is questioned; no PIN/OTP, regional account or expiry is involved. The manual setup path remains accessible to everyone.

Source: [review instructions](https://support.google.com/googleplay/android-developer/answer/9859455#app_access).

## Data safety: evidence and draft answers

“Stored or processed by the app” and “collected off-device for the Data safety form” are different. The public policy discloses the local health information even where it is excluded from a collection label.

| Data/flow | Audit result | How to handle the form |
|---|---|---|
| Names, DOB, sex, relationships, caregiver labels, medicine schedules, dose records, notes | Local Room records; no developer endpoint | On-device-only processing does not require a collection declaration by itself |
| Prescription photos | Selected with Android photo picker, copied privately | Local processing alone is not off-device collection; consider export destinations separately |
| Local IDs and settings | App record IDs/settings, not an advertising SDK | Do not label local UUIDs as collected device identifiers without off-device collection evidence |
| Share schedule/summary | Specific user action chooses an external app | User-initiated sharing exception may apply when the user reasonably expects that transfer; policy still explains it |
| Manual backup/restore | User-selected file provider; provider may be cloud-backed | Assess both collection and sharing, not just INTERNET permission. The sharing exception does not automatically exempt off-device collection. Confirm actual providers, recipient access and disclosure before finalising |
| Weekly backup | User chooses a folder once; subsequent writes are automatic | Confirm the setup clearly explains recurring writes and possible online-provider upload. Do not assume every later transfer qualifies as a fresh user-initiated action |
| Google Play updates | Play Store processes device metadata, app version, modules/asset packs | Check SDK guidance and final integration. Google documents processing, but does not give a complete Console data-type mapping here. Do not invent device-ID collection or assume a blanket exemption solely because it is Google |
| Support/translation email | External email app; developer receives sent address, message, attachments and possibly language | Disclosed in policy. Verify applicability to your actual support flow; do not state the developer never receives personal information |
| Ads/analytics/automatic crash SDK | None found | No such SDK-derived data categories supported by this audit |

**Collection/sharing top-level question: pending final verification, not a prefilled “No”.** Local health-data processing is well supported; third-party provider backup and update handling need the final release/provider/SDK interpretation. The old repository checklist’s unconditional “No data collected or shared; no data transmitted off device” is not sufficient evidence. Do not submit that answer blindly. If an in-scope off-device flow must be declared, select the actual categories and purposes—for example health information/photos for a health backup, optional backup collection and app functionality—rather than marking every local field as always collected.

**Account creation:** No online account creation/login exists in the audited build. Local family profiles are not service accounts. Do not claim a non-existent web account-deletion facility.

**Deletion:** Users can clear app storage/uninstall to remove local data, but item deletion leaves tombstones and some history; exported/shared data needs separate deletion. A Console question about requesting deletion of collected data is not answered solely by an uninstall instruction. If collected data is declared, describe the real request/retention process for that data. Support correspondence can be addressed by email. Do not promise remote deletion of files held by unrelated recipients/providers.

**Encryption in transit:** This is not the same as encrypted ZIP files or app-private storage. Google documents encryption for its update flow; arbitrary external storage/share providers must be evaluated separately. Do not select “all data encrypted in transit” without verifying all in-scope transfers, and do not claim encryption at rest for CareDose backups/database.

**Independent security review:** Do not claim one; this source audit is not a recognised independent security assessment.

Sources: [Data safety definitions and exceptions](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en), [Google Play update processing](https://developer.android.com/guide/playcore/in-app-updates#data-safety), [account deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en).

## Permissions and other declarations

- `POST_NOTIFICATIONS`: medicine reminders, including give/skip/snooze actions. Optional; local record keeping remains available if denied.
- `SCHEDULE_EXACT_ALARM`: user-granted special access for scheduled reminders. Current source does **not** use `USE_EXACT_ALARM`; do not fill a restricted USE_EXACT_ALARM declaration as if it did. Inexact fallback is implemented.
- `RECEIVE_BOOT_COMPLETED`: reschedules reminders following a reboot.
- Existing merged output adds `WAKE_LOCK`, `ACCESS_NETWORK_STATE`, `FOREGROUND_SERVICE` and a generated private receiver permission. Reinspect the fresh release manifest and any foreground-service types rather than assuming this cached output is the new build.
- Photo picker and Storage Access Framework: no camera or broad photo/storage permission is requested. Do not declare broad photo/video library access for this implementation.
- No location, contacts, SMS, AccessibilityService, VPN, financial service, public social feed, government service, news service or Health Connect integration found. Answer any corresponding Console questions from the final build and real business status.
- No billing integration found. Pricing, countries, distribution tracks, content-rating responses and any account-specific mandatory forms still require the actual Console configuration.

## Before sending for review

1. Reconcile source version 0.0.1 versus older build output 1.0.0 and generate/inspect the exact release AAB.
2. Deploy the website policy (not done by this task), verify it is publicly accessible without login/geofencing, and link it from More → Privacy. Reconcile in-app summary translations and backup disclosures with the policy.
3. Resolve the Data safety items above; do not treat this guide as an automatic policy approval.
4. Fix absolute claims in the already-generated first screenshot, privacy screenshot and feature graphic. No replacement artwork was generated in this task.
5. Run the repository’s release checks and real-device reminder matrix, plus sample-data review path and backup/restore on a disposable installation. A static website audit cannot confirm reliable reminder delivery.
6. Paste the listing fields, health declaration and verified Data safety answers. Submit only when the developer is ready; no commit, push, deployment or Play Console write was requested or performed.
