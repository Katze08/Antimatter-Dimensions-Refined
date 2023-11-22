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
<b>Minor Update 13.10.2023 08:43PM UTC+1</b><br>
<ul>
<li>This is the first update after the first ever Alpha release. Expect some Minor Updates before the next big drop happens.
This minor update adds a logarithmic percentage below the "Purchased X times" phrase in the tooltip next to the buttons at Antimatter Dimensions. The percentage features a sub-tooltip that mentions what it's meaning is: It shows the logarithmic percentage to the cost of the next purchase based on your current antimatter amount (like the progress bar for infinity / eternity / reality / etc). It isn't visible if the cost is so low that it has an exponent of 0 (for example, 1 AM at the first 1st dimension).</li>
</ul>
<br>
<b>Minor Update 13.10.2023 09:57PM UTC+1</b><br>
<ul>
<li>The progress bar now shows "Percentage till intergalactic" if you are not intergalactic. As soon as you become intergalactic it becomes "Percentage to infinity".</li>
</ul>
<br>
<b>Minor Update 14.10.2023 09:05AM UTC+1</b><br>
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
<b>Minor Update 14.10.2023 11:23AM UTC+1</b><br>
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
<b>Minor Update 14.10.2023 06:50PM UTC+1</b><br>
<ul>
<li>If you Infinity and get the big button (where even the header disappears), everything now disappears (including the sidebar, savetimer, news and the how to play).</li>
</ul>
`
  },
  {
    date: [2023, 11, 8],
    name: "Galaxy Map Part 1 Update",
    info: `
After almost a month of waiting for the next update, I can finally announce that the update is finally out! There won't be any minor updates for this update unless a game-breaking bug is found.
<br>
<br>
<b>Major features</b><br>
<ul>
<li>The "Become Intergalactic" button has been utilized with the Galaxy Map (tab name: Intergalactical map).</li>
<li>The Galaxy Map is similar to the Perk Map except all "galaxies" have one color and connections don't exist. There is only one layout and physics are disabled, they can however still be dragged around which is a minor bug and will be fixed soon (dragging around the galaxies won't change anything in gameplay)</li>
<li>Even though the galaxy upgrade "Observable Universe" says that it is 30 million light years across in its initial value, galaxies can only generate as far as 10 million light years out currently. There is no delay as of now.</li>
<li>Every galaxy has different stats (size, power, distance, delay, requirement). Distance is the bigger value of either X or Y. Delay is currently for all galaxies 0 seconds. Power and requirement depend on the size: Galaxies can have a size range between 10000 light years and 1 million light years and power means, how many vanilla galaxies the galaxy simulates and is the square root of the size divided by 100000 (giving it a range between x0,316 and x3,162) and requirement means, how many 8th antimatter dimensions you need for it. Less powerful galaxies have a lower requirement than higher ones. If you buy a galaxy with a x1 power it will be 60 8th dims higher than the last one. However, if it is only x0.5, it will only be 30 8th dims higher, but if it is x2, you will have to grind for 120 more 8th dims.</li>
<li>Between two galaxies there is a 2 million light year gap resulting in 121 possible slots for a galaxy to generate. However, except for the "CENTER" galaxy with a 100% probability (the CENTER one has the same stats as a vanilla galaxy), every slot has a 30% probability to generate a galaxy. (Currently random generation is disabled)</li>
</ul>
<br>
<b>Minor features</b><br>
<ul>
<li>Updated the UI of the Antimatter Dimensions tab. Galaxies are gone and dimension boost got a new place next to the tickspeed button. The galaxy autobuyer will still buy vanilla galaxies. The percent bar got moved to the top as well.</li>
</ul>
`
  },
  {
    date: [2023, 11, 10],
    name: "The Simulation Update Part 1",
    info: `
Turns out it was all a simulation...
<br>
<br>
<b>Major features</b><br>
<ul>
<li>After getting END antimatter and seeing the credits, you get to see a different restart the game screen. It says: "TURNS OUT IT WAS ALL A SIMULATION." and the button which would reset the game is red and says "Start a new simulation".</li>
<li>Starting a new simulation lets you replay the game but achievements, secret achievements and anything under the General subheader in the statistics is keeped. As of now, there are no bonuses.</li>
<li>It also makes all tabs visible (unless hidden in the settings) and there is a new Simulation tab with a Simulation Settings subtab. There is no content in that as for now.</li>
<li>There is also a new Simulation subheader in the statistics.</li>
<li>For starting a new simulation you get a new achievement (191)</li>
</ul>
<br>
<b>Minor features</b><br>
<ul>
<li>Default notation is now Scientific.</li>
<li>Total antimatter produced now starts with 1 instead of 10.</li>
<li>The end diacritics for the tab names in the sidebar now end with "See You Next Simulation" instead of "Good Bye Forever"</li>
</ul>
`
  },
  {
    date: [2023, 11, 14],
    name: "Automation Gears Update",
    info: `
Automation Gears are a new mechanic post-simulation that allows you to decrease autobuyer intervals before reaching late-celestials like Ra and Lai'tela. Gear upgrades are not reset on simulation. Please note that this is the last bigger update for now, from now on, there will be some minor updates to fix bugs. The galaxy autobuyer is currently still bricked, but as soon as I fix it, I'll push it as minor update.
<br>
<br>
<b>Major features</b><br>
<ul>
<li>New subtab in the Automation tab called "Automation gears"</li>
<li>4 gears that can be upgraded (an Antimatter, an Infinity, an Eternity and a Reality gear). Initial costs: Antimatter: 1e1e5, exponent gets multiplied by 10 after every purchase; Infinity: 1e1e3, exponent gets multiplied by 2 after every purchase; Eternity: 1, exponent +2000 every purchase; Reality: 1, exponent +50 every purchase</li>
<li>per upgrade, the multiplier of the gear gets multiplied by 1.1, the total gear score is all 4 gears multiplied with each other</li>
<li>Autobuyer intervals are divided by the gear score unless they have an instant interval.</li>
</ul>
<br>
<b>Minor features</b><br>
<ul>
<li>Another slight UI change in the antimatter dimension tab by ʇʎouıplɐuop.</li>
<li>The autobuyer subtab is slightly modified to fit for the gears.</li>
<li>The 19th row is now obscured until the first simulation reset.</li>
<li>If you buy all gear upgrades at least once, you gain achievement 192.</li>
</ul>
<br>
<b>Minor Update 15.11.2023 07:13PM GMT+1</b><br>
<ul>
<li>The galaxy autobuyer should work again. Tell me if that's not the case.</li>
<li>Galaxies in the map now show the precise requirement if over 1000.</li>
<li>The distance value is now in million light years (e6, if 10 million it's shown as 1e7), was previously shown wrong.</li>
</ul>
<br>
<b>Minor Update 16.11.2023 04:06PM GMT+1</b><br>
<ul>
<li>Galaxies in the map are no longer visually affected by Pelle's Doomed Reality.</li>
<li>Galaxies update its visual requirement after switching the tab (you don't have to refresh anymore, in the future I want to do instant updates)</li>
</ul>
<br>
<b>Minor Update 17.11.2023 10:25AM GMT+1</b><br>
<ul>
<li>Another bug regarding the galaxy autobuyer should be fixed.</li>
<li>Achievements that refer to bought antimatter galaxies now trigger after you have that much galaxies, not galaxy power.</li>
<li>Removed the free coupon by McDonalds joke.</li>
<li>If you have the 300 IP upgrade, not only the galaxy power starts at x1, but you also start with 1 bought galaxy.</li>
</ul>
`
  },
  {
    date: [2023, 11, 19],
    name: "Expensive Time Studies Update",
    info: `
As decided in a poll yesterday, only a few studies (currently 2) are included and the rest will come in the future minor updates.
In this update, you can buy "expensive time studies". These studies are for the post-reality stage and are therefore located below the reality study. The cost is, as the name says, expensive, to make use of the excess of TT.
<br>
<br>
<b>Minor Update 21.11.2023 07:12PM GMT+1</b><br>
<ul>
<li>In the galaxy map subtab, there are now references to replicanti, tachyon, and Galaxy Generator galaxies. Galaxy power is shown for only antimatter galaxies, but also for all galaxies summed up.</li>
<li>If you once were intergalactic, you could buy galaxies without the need of being intergalactic. That's fixed.</li>
<li>Added 15 new expensive studies and thus, completing the Expensive Time Studies Update for now.</li>
</ul>
<br>
<b>Minor Update 22.11.2023 XX:XXPM GMT+1</b><br>
<ul>
<li>Grammatical changes to the first change of the last minor update.</li>
<li>Galaxy Map Tab now shows how much the next galaxy would cost if it had a x1.000 power (or vanilla galaxy)</li>
<li>Renamed Intergalactic Upgrades and Intergalactical Map to Galaxy Upgrades and Galaxy Map.</li>
<li>Galaxy tabs now also get unlocked if you have an infinity, eternity, or reality.</li>
<li>Added the Galaxy Extender and the Galaxy Fuser tabs. These get unlocked upon buying the approviate galaxy upgrades but are still useless as for now.</li>
<li>Renamed the "Challenges" subtab in the Challenges tab to "Normal Challenges".</li>
<li>You could become intergalactic without the mandatory 4 dimboosts when the tab was unlocked. That's fixed. With that change, the upgrades also won't show up if you aren't meeting both requirements.</li>
<li>When buying the 300 IP upgrade, you are intergalactic from the beginning and keep your Galaxy upgrades.</li>
<li>Updated the changelog.</li>
</ul>
`
  }
];


for (let i = 0; i < changelog.length; i++) {
  changelog[i].id = i;
}
