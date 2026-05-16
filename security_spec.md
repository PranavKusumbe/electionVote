# Security Specification - VoterLab

## Data Invariants
1. Users can only create/update their own profile.
2. Election data (candidates, timeline, deadlines) are read-only for all users.
3. User interaction data (if any) must be strictly tied to the `auth.uid`.

## Dirty Dozen Payloads (Red Team)
1. Write to another user's profile: `setDoc(doc(db, 'users', 'other_uid'), { ... })` -> DENIED.
2. Modify a candidate's platform: `updateDoc(doc(db, 'candidates', 'can1'), { platform: 'fake' })` -> DENIED.
3. Change an election deadline: `updateDoc(doc(db, 'deadlines', 'dl1'), { date: '2100' })` -> DENIED.
4. Anonymous write to users: `setDoc(doc(db, 'users', 'random'), { ... })` (no auth) -> DENIED.
5. Spoof UID in user document: Create doc in `users/uid1` with `{ uid: 'uid2' }` -> DENIED (request.resource.data.uid must match userId/auth.uid).
6. Create doc with massive ID: Create doc with 2KB string ID -> DENIED (isValidId check).
7. Inject extra fields into user doc: `setDoc(doc(db, 'users', uid), { uid, email, isAdmin: true })` -> DENIED (keys size/names check).
8. Update immutable field `uid` in user profile -> DENIED.
9. List all user profiles without filtering -> DENIED (rules enforce personal access).
10. Read candidate data without being signed in -> ALLOWED (public info).
11. Predictable ID injection for timeline -> DENIED (isValidId).
12. Resource exhaustion via massive strings in user display name -> DENIED (size checks).
