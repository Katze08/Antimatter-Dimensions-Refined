export const changelog = [
  /**
   * @template
   * {
   *  @property {Array: Number} date  Date of the release of the update, stored in order of year-month-date.
   *  @property {String} name         Name of the update entry. Optional.
   *  @property {Number} id           Unique ID for each entry (generated in-game, not explicitly stated)
   *  @property {function: @return String} info  Text body of information for the entry.
   * }
   */
  {
    date: [2023, 10, 12],
    name: "6/12 Galaxy Upgrades",
    info: `
This marks the first ever release of this mod!
<br>
<br>
<b>Current features</b><br>
<ul>
<li>You start out with 1 instead of 10 antimatter, AD initial costs are divided by 10 and progression is 10x slower at the start (1st dimension multiplier divided by 10) - ultimately this means you need 1 more order of magnitude (OoM or the number after the e).</li>
<li>Galaxies are getting refined as well (mostly NYI, Not Yet Implemented), what's already implemented are 6 out of 12 Galaxy Upgrades (GUs) that are not only upgrading Galaxies but also different aspects of the game, making the entire game speed up rapidly at around e100-e120 AM. Antimatter Galaxies have a (DEPRECATED) sign since these are getting removed in the future and replaced by a new mechanic.</li>
</ul>
<br>
<b>Minor Update 13.10.2023 08:43PM UTC+2</b><br>
<ul>
<li>This is the first update after the first ever Alpha release. Expect some Minor Updates before the next big drop happens.
This minor update adds a logarithmic percentage below the "Purchased X times" phrase in the tooltip next to the buttons at Antimatter Dimensions. The percentage features a sub-tooltip that mentions what it's meaning is: It shows the logarithmic percentage to the cost of the next purchase based on your current antimatter amount (like the progress bar for infinity / eternity / reality / etc). It isn't visible if the cost is so low that it has an exponent of 0 (for example, 1 AM at the first 1st dimension).</li>
</ul>
<br>
<b>Minor Update 13.10.2023 09:57PM UTC+2</b><br>
<ul>
<li>The progress bar now shows "Percentage till intergalactic" if you are not intergalactic. As soon as you become intergalactic it becomes "Percentage to infinity".</li>
</ul>
<br>
<b>Minor Update 14.10.2023 09:05AM UTC+2</b><br>
<ul>
<li>The progress bar isn't always green anymore, but shows the current stage's color.</li>
<li>If you are in a normal challenge: the red from the sidebar outlines</li>
<li>If you are in a infinity challenge or your next goal is infinity or your next goal is a new Infinity dimension: the brown from the big crunch button outline</li>
<li>If you are in an eternity challenge or your next goal is eternity: the purple from the eternity button outline</li>
<li>If you are in dilation: the green from the dilate time button outline</li>
<li>If you are in Lai'tela destabilization: a very dark color</li>
<li>If your next goal is a tesseract: white</li>
<li>If your next goal is the galaxy generator: the blue color from the Pelle tab</li>
<li>If a Pelle strike awaits you: the red color from the Pelle tab</li>
<li>If your next goal is becoming intergalactic: the purple from the Galaxy tab</li>
<li>If your next goal is Reality: the green from the Reality button outline</li>
</ul>
<br>
<b>Minor Update 14.10.2023 11:23AM UTC+2</b><br>
<ul>
<li>Multiple features have been added to this minor update.</li>
<li>The gray buttons in the autobuyer boxes that say that you need to do a challenge have been removed. This doesn't affect functional buttons.</li>
<li>The title of the page is now "Antimatter Dimensions Refined" instead of "Antimatter Dimensions".</li>
<li>In the "About the game" modal, the sentence "This is a modded version by Katze08 called Antimatter Dimensions Refined." was added.</li>
<li>Replaced some links in the "About the game" modal that referred to the vanilla game with links that refer to mod-based things.</li>
<li>Removed some links in the "About the game" modal that don't have an mod counterpart.</li>
<li>New mod changelog that replaces the vanilla changelog.</li>
<li>New link in the "About the game" modal that refers to the vanilla game.</li>
<li>Added two new categories to the credits: "Modder" with my name and "Supporter" with the name of ʇʎouıplɐuop.</li>
</ul>
<br>
<b>Minor Update 14.10.2023 06:50PM UTC+2</b><br>
<ul>
<li>If you Infinity and get the big button (where even the header disappears), everything now disappears (including the sidebar, savetimer, news and the how to play).</li>
</ul>
`
  }
];


for (let i = 0; i < changelog.length; i++) {
  changelog[i].id = i;
}
