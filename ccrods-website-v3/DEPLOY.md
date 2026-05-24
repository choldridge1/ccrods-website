# CCRods.com — Deploy to Cloudflare Pages via GitHub
## Complete Step-by-Step Guide

---

## OVERVIEW

This guide walks you through:
1. Installing Git on your computer
2. Creating a GitHub account and repository
3. Pushing the website files to GitHub
4. Connecting GitHub to Cloudflare Pages
5. Pointing your ccrods.com domain to Cloudflare

**Time required:** ~30–45 minutes (first time)  
**Cost:** Free (Cloudflare Pages free tier covers this site)

---

## PART 1 — INSTALL GIT

### Windows
1. Go to **https://git-scm.com/download/win**
2. Download and run the installer
3. Accept all defaults during installation
4. When done, open **Command Prompt** or **Git Bash** and type:
   ```
   git --version
   ```
   You should see something like `git version 2.44.0`

### Mac
1. Open **Terminal** (search Spotlight for "Terminal")
2. Type:
   ```
   git --version
   ```
3. If Git isn't installed, macOS will prompt you to install Xcode Command Line Tools — click Install and wait for it to finish
4. Run `git --version` again to confirm

---

## PART 2 — CONFIGURE GIT (One-Time Setup)

Open Terminal (Mac) or Git Bash (Windows) and run these two commands — replace with your real name and email:

```bash
git config --global user.name "Chris Smith"
git config --global user.email "chris@ccrods.com"
```

---

## PART 3 — CREATE A GITHUB ACCOUNT

1. Go to **https://github.com**
2. Click **Sign up**
3. Follow the prompts — choose a username (e.g. `chriscustomrods`)
4. Verify your email address
5. Choose the **Free** plan

---

## PART 4 — CREATE A GITHUB REPOSITORY

1. Log in to GitHub
2. Click the **+** icon in the top-right → **New repository**
3. Fill in:
   - **Repository name:** `ccrods-website`
   - **Description:** Chris's Custom Rods website
   - **Visibility:** Public *(required for Cloudflare Pages free tier)*
   - Leave everything else at defaults
4. Click **Create repository**
5. GitHub will show you a page with setup commands — **leave this tab open**

---

## PART 5 — PUSH YOUR WEBSITE FILES TO GITHUB

### 5a. Open Terminal/Git Bash and navigate to your website folder

If your website files are in a folder called `ccrods` on your Desktop:

**Mac:**
```bash
cd ~/Desktop/ccrods
```

**Windows:**
```bash
cd C:\Users\YourName\Desktop\ccrods
```

### 5b. Initialize Git in the folder

```bash
git init
```

### 5c. Add all files

```bash
git add .
```

### 5d. Make your first commit

```bash
git commit -m "Initial website launch"
```

### 5e. Connect to GitHub

Copy the URL from the GitHub page you left open. It looks like:
`https://github.com/chriscustomrods/ccrods-website.git`

Then run:

```bash
git remote add origin https://github.com/chriscustomrods/ccrods-website.git
git branch -M main
git push -u origin main
```

### 5f. Authenticate

GitHub will ask for your username and password.  
**Note:** GitHub no longer accepts account passwords for Git — you need a **Personal Access Token**:

1. Go to **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name: `ccrods-deploy`
4. Check the **repo** checkbox
5. Click **Generate token**
6. **Copy the token immediately** — you won't see it again
7. Use this token as your password when Git asks

### 5g. Verify

Go to `https://github.com/chriscustomrods/ccrods-website` — you should see all your files.

---

## PART 6 — SET UP CLOUDFLARE PAGES

### 6a. Create a Cloudflare account

1. Go to **https://cloudflare.com**
2. Click **Sign Up** → create a free account
3. Verify your email

### 6b. Connect GitHub to Cloudflare Pages

1. In Cloudflare dashboard, click **Workers & Pages** in the left sidebar
2. Click **Create application** → **Pages** tab → **Connect to Git**
3. Click **Connect GitHub**
4. Authorize Cloudflare to access your GitHub account
5. Select your repository: `ccrods-website`
6. Click **Begin setup**

### 6c. Configure the build

For this static HTML site, use these settings:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | *(leave blank)* |
| Build output directory | `/` |
| Root directory | *(leave blank)* |

7. Click **Save and Deploy**

Cloudflare will deploy your site. After 1–2 minutes you'll get a URL like:  
`https://ccrods-website.pages.dev`

**Your site is live!** Test it at that URL before continuing.

---

## PART 7 — ADD YOUR CUSTOM DOMAIN (ccrods.com)

### 7a. Add ccrods.com to Cloudflare

1. In Cloudflare dashboard, click **Add a Site**
2. Type `ccrods.com` → click **Add site**
3. Choose the **Free** plan → **Continue**
4. Cloudflare will scan your existing DNS records → click **Continue**

### 7b. Update your domain's nameservers

Cloudflare will give you two nameservers like:
```
aria.ns.cloudflare.com
bob.ns.cloudflare.com
```

1. Log in to wherever you bought `ccrods.com` (GoDaddy, Namecheap, Google Domains, etc.)
2. Find **DNS Settings** or **Nameservers**
3. Replace the existing nameservers with Cloudflare's two nameservers
4. Save

**Note:** Nameserver changes can take up to 24 hours to propagate, but usually happen in under 2 hours.

### 7c. Connect your custom domain to Pages

1. Go back to **Workers & Pages** → click on `ccrods-website`
2. Click the **Custom domains** tab
3. Click **Set up a custom domain**
4. Type `ccrods.com` → **Continue**
5. Also add `www.ccrods.com` and set it to redirect to `ccrods.com`
6. Cloudflare will automatically configure DNS and issue an SSL certificate

### 7d. Verify

Once nameservers propagate, visit **https://ccrods.com** — your site should be live with a green padlock (HTTPS).

---

## PART 8 — FUTURE UPDATES

Every time you update your website files:

```bash
# Make your changes to the files, then:
git add .
git commit -m "Describe what you changed"
git push
```

Cloudflare Pages automatically detects the push and redeploys within ~60 seconds. **Zero manual steps.**

---

## PART 9 — SET UP FORMSPREE (Contact & Order Forms)

The forms use Formspree to send emails without a backend server.

1. Go to **https://formspree.io** → Sign up free
2. Click **New Form** → name it `CCRods Order Form`
3. Copy your form ID (looks like `xpzgdqkv`)
4. In `order.html`, replace `YOUR_FORM_ID` in the action URL:
   ```
   action="https://formspree.io/f/xpzgdqkv"
   ```
5. Do the same in `contact.html` and `blog.html` (newsletter)
6. You can use the same form ID for all three, or create separate ones
7. Formspree will email submissions to whatever address you set

Free tier: 50 submissions/month. Paid plans available if you need more.

---

## QUICK REFERENCE CHEATSHEET

```bash
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# Every update after that
git add .
git commit -m "What I changed"
git push
```

---

## TROUBLESHOOTING

**"Permission denied" when pushing:**  
→ Use your Personal Access Token (not your GitHub password) — see Part 5f

**Site shows old version after push:**  
→ Wait 60–90 seconds and hard-refresh (Ctrl+Shift+R / Cmd+Shift+R)

**Domain not loading after nameserver change:**  
→ Wait up to 24 hours. Check propagation at https://dnschecker.org

**Forms not sending:**  
→ Make sure you replaced `YOUR_FORM_ID` with a real Formspree form ID

**SSL certificate error:**  
→ In Cloudflare → SSL/TLS → set mode to **Full** or **Flexible**

---

*Guide prepared for Chris's Custom Rods | ccrods.com*
