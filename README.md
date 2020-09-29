## Pokemon Team Builder
Noah Olson - noahvolson - nvolson

Glitch Link: https://a3-noah-olson.glitch.me

Goal: This application gives users a platform to theorycraft Pokemon teams 

Challenges: I struggled to implement OAuth because I thought that I would need to interact with sessionstorage. I ended up using cookies and this worked fine for my purposes. 

Authentication: I used OAuth because it seemed easiest to implement and because I wouldn't have to spend time ensuring the security of stored accounts.

CSS Framework: I used NES.css because I think that it fits the 80's game aesthetic that I wanted to create and it matches the pixellated sprites that I found. I made no modifications to the CSS framework but I did use the !important keyword to ovierride the font size of text input boxes because they were visually overpowering. 

Express Middleware:
- body-parser: This assisted my conversions of request bodies to json.
- serve-favicon: This caches my favicon icon in memory to improve performance (because it is so frequently accessed).
- helmet: This sets several HTTP headers which increase application security.
- passport: This (in conjunction with the GitHubStrategy) allowed me to use github authentication instead of storing logins myself
- cookie-parser: This parses my cookies and puts them into a request to enable seperate user sessions. 

I used several others but they are largely supplemental to the ones listed here

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy


## Notes
- Insert, Update, and Delete are achieved with one button: Insert by adding to an empty team slot, Update by changing an existing one, and Delete by submitting when a slot is not filled

- Theme is not tied to account to encourage users to tinker with the visuals of the page

