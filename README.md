# /vrg/ VRChat worlds website
### Maintaining
 - The site is meant to be self-sufficent in terms of HTML/Javascript/CSS.
 - If you want to add a feature fork the repository and submit a Pull Request.
 - If you want to add/remove/edit maps, submit a Pull Request or submit an [issue](https://github.com/ThePyrotechnic/vrg_website/issues/new) so someone else can do it.
### About the config.json file
 - The config.json allows the site to be easily updated without having to write more HTML.
 - Every world can (but does not need to) have a `name`, `author`, `world_id`, and `thumbnail`.
 - The `world_id` should _not_ contain `vrchat://`, `id=`, etc.. See the existing config for examples.
 - Thumbnails should be `512x512` or at least an approximately square image. 
 - New categories can be added by adding a new key to the `worlds` dictionary.
   - For example:
```json
{
  "worlds": {
    "public": [
      ...
    ],
    "unlisted": [
      ...
    ],
    "myNewCategory": [
      ...
    ]
  }
}
```
The site will update automatically when the changes are merged.