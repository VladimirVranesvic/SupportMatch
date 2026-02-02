# Support Match

A website to help NDIS participants and coordinators find and connect with support workers across Australia.

## What it does

- **For visitors:** Browse support workers, filter by region and other criteria, and submit a request to get matched.
- **For coordinators:** See featured workers and use the finder to shortlist candidates.
- **For admins:** View and manage contact form submissions in a protected admin area.

The site uses a database (Supabase) for workers and requests, and includes basic protections against spam and abuse.

---

# Support Match – What’s Changed (Vlad's updates)

A short summary of the main updates to the Support Match website.

## What’s New

**Data and storage**
- The site now uses a database (Supabase) to store worker listings and contact form submissions.
- Worker data can be migrated from a CSV file into the database using a built-in script.

**Contact form**
- Form submissions are saved in the database.
- Stronger checks on email addresses to reduce spam and invalid entries.
- A hidden field helps block automated bots from submitting the form.
- Limits on how often the same person can submit (to prevent abuse).

**Admin area**
- A separate admin page where staff can log in with an API key (samgay) and view all contact form submissions.
- You can search by email, see full details (name, company, location, role, phone, needs), and export data (as CSV file/s).
- Login is stored in the browser so you don’t have to log in every time.

**Worker listings**
- Workers are given a simple “tier” score based on how complete their profile is, so better profiles can be shown first.
- The finder page and filters work with the new database and tier system.

**Security and quality**
- Rate limiting and email validation reduce spam and abuse.
- Types and checks in the code improve reliability and make future changes safer.

## What You Need to Run It

**Environment variables** (set in your hosting or `.env`):
- `NEXT_PUBLIC_SUPABASE_URL` – your Supabase project URL  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anonymous key  
- `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key (for admin)  
- `ADMIN_API_KEY` – (optional) key for accessing the admin area  

**Database**
- Supabase should have `requests` and `workers` tables.
- To load workers from a CSV into the database, run: `npm run migrate`

---

## To do list

**Images**
- Add required images to the site, workout an appropriate layout that will not effect the functionality of the site.

## Hosting 

**Host the new site at supportmatch.com**
-

---

## Potential updates

- **Login for clients** – Let visitors create an account and log in so they can see their past inquiries and save workers they’re interested in (e.g. a shortlist or favourites).
- **Richer worker cards** – Show more detail on each worker card (e.g. bio, skills, availability) and add a photo so clients can get a better sense of who they’re matching with.