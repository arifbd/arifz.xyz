# Source audit: CareDose

Audit date: 4 October 2026. Developer identity used in public policy: **arifz**. Source root: `/Users/arif/AndroidProjects/arifz/personal/CareDose`.

## Verified implementation

| Area | Finding | Source relative to Android project |
|---|---|---|
| Package/platform | `xyz.arifz.caredose`, Android 9+ (`minSdk 28`) | `app/build.gradle.kts` |
| Release scope | `CLOUD_FEATURES=false`; account/cloud/sync entry points hidden | `app/build.gradle.kts`, `Features.kt`, `ui/CareDoseApp.kt` |
| Stored data | Profiles, optional DOB/sex/notes; medicines/doses/times; event names, caregiver label, notes and timestamps | `data/model/`, `data/db/Entities.kt` |
| Persistence | Room database and private photo files; no app-layer encryption or app lock found | `data/db/CareDatabase.kt`, `data/files/PrescriptionStore.kt` |
| Photos | Android photo picker; selected images copied/resized as JPEG | `ui/screens/medicines/MedicineEditorScreen.kt`, `data/files/PrescriptionStore.kt` |
| Reminders | User-enabled notifications; exact alarms where granted, inexact fallback; 10-minute snooze, 30-minute follow-up; reschedule after reboot/time changes | `reminder/`, `AndroidManifest.xml` |
| Notification privacy | PRIVATE visibility with generic public fallback; detailed notification contains medicine/member/amount/time | `reminder/ReminderNotifier.kt` |
| Sharing | User chooses external app via Android ACTION_SEND; schedule or aggregate weekly text | `ui/CareDoseApp.kt`, `ui/screens/family/ShareCareScreen.kt`, `ui/screens/settings/SummaryScreen.kt` |
| Backup | Unencrypted ZIP; JSON/JSONL + photos; chosen SAF location; optional approximately weekly WorkManager job | `data/backup/BackupManager.kt`, `AutoBackupWorker.kt`, `BackupCodec.kt` |
| Backup retention | Five automatic backup files retained by prefix; up to three private pre-restore ZIP snapshots | `data/backup/BackupManager.kt` |
| Restore | Confirmed restore replaces records; saves pre-restore snapshot when nonempty; preserves device settings | `data/backup/BackupManager.kt`, `ui/screens/settings/DataScreens.kt` |
| Android backup | `allowBackup=false`; exclusion rules for cloud and transfer | `AndroidManifest.xml`, `res/xml/backup_rules.xml`, `data_extraction_rules.xml` |
| Deletion | Member/medicine/event rows are tombstoned, not physically purged by individual delete; dose history survives member/medicine delete; active photos removed by corresponding UI flow | `data/CareRepository.kt`, `data/db/CareDao.kt`, `ui/CareDoseViewModel.kt` |
| Updates | Google Play flexible in-app update library and preferences | `data/update/PlayAppUpdater.kt`, `UpdatePrefs.kt`, `app/build.gradle.kts` |
| SDKs | No ads, analytics, Health Connect, integrated crash SDK or billing dependency found in audited configuration | `app/build.gradle.kts`, `gradle/libs.versions.toml` |
| Permissions | Source: notifications, boot, SCHEDULE_EXACT_ALARM. Existing merged release additionally has wake lock, network state, foreground service and generated private receiver permission. No INTERNET, broad photos, camera, location, contacts or USE_EXACT_ALARM | Source and existing merged release manifests |
| Languages | 19 language options, including English/Bangla; Arabic/Urdu RTL | `ui/util/AppLocale.kt`, `res/xml/locales_config.xml` |
| Demo access | “Explore with sample data” creates local example records without login | `ui/screens/onboarding/OnboardingScreens.kt`, `ui/CareDoseViewModel.kt` |

## Release issues to reconcile

1. **Version mismatch:** current `gradle.properties` says 0.0.1, while existing merged release manifest says 1.0.0/10000. Existing build output is historical evidence, not proof of the next artifact. Set the intended release version and inspect the actual AAB/merged manifest after rebuilding. Public policy deliberately describes the audited offline scope without claiming an unverified version.
2. **In-app privacy is incomplete:** More → Privacy has summary cards, no link to the full hosted policy. English text says the app never uploads anything and data leaves only through sharing or backup; it omits update handling, support, tombstones, internal snapshots and unencrypted backup detail. Add the final hosted policy link and reconcile the summaries and translations before release. Merely hosting a new policy does not update the app.
3. **Existing repository docs are stale:** `docs/privacy-policy.md` and `docs/RELEASE_CHECKLIST.md` assume blanket “no data transmitted”/simple deletion. Use the new policy and declaration analysis; do not copy those statements unchanged.
4. **Provided store title is too long:** “CareDose: Family Medicine Tracker” is 33 characters. Replacement title is 27 characters and fits the 30-character field.
5. **Existing assets have absolute claims:** `01-never-miss-a-dose.png` and the feature graphic say “Never miss a dose”; `08-private-offline.png` says “100% private”/“Your data stays on your phone”. These conflict with reminder limitations and export/provider behaviour. They were not changed or used on the website. Revise their text before release. The remaining supplied assets used on the page are copied unchanged; screenshot contents are examples, not medical instructions.
6. **Health disclaimer:** store text includes the current Google Play non-medical-device disclaimer and instruction to consult a healthcare professional. Existing app wording only says no dose calculation/professional-advice replacement; keep in-app health statements aligned too.
7. **Backup disclosure:** the app says backup files contain health information but does not clearly state that ZIPs are unencrypted. Add that detail next to export/automatic-backup setup; the new public policy already discloses it. This matters especially with third-party online folder providers.

No Android source/build files were changed in this task. Unit/device tests mentioned by the repository’s earlier readiness document were not rerun or independently treated as current results. This task validates the new static pages, not reminder reliability on devices.
