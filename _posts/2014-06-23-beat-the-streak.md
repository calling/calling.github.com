---
layout: post
title: "Beat The Streak"
published: false

---

Over the weekend my friend introduced me to [Beat The Streak](http://mlb.mlb.com/mlb/fantasy/bts/y2014/splash_index.jsp), a fantasy baseball game where you try to break Joe DiMaggio's 1941 record of 56 straight games with a hit. As a participant, your job is much more feasible (albeit less straightforward) than what DiMaggio did — merely predict a player each day who will earn a hit for 57 straight (game) days. This sounds deceivingly easy.

Because it is. With Warren Buffet's recent March Madness bet fresh our memories, we all know that "deceptively easy" does not mean "easy". Since I love squashing hopes and dreams and ruining good times with mental math, I did a bit thinking out loud.

Generally, this is just the probability of predicting the correctness of fifty-seven independent events, which is \\(p^{57}\\), where \\(p\\) is the probability of getting a hit on any arbitrary day (assuming all days are equal — not an assumption to be taken lightly, since weather is notorious for affecting baseball play, but lets just ignore this because it's easier). League average last year was a measly .256, which is essentially a one in four chance every day. This gives us a success rate of \\((\frac{1}{4})^{57}\*100 = 4.8148249e-33\\). Not even worth playing at that rate.

However the game helps you out by suggesting a few of the best players to pick from each day, so it's unlikely that a user will pick arbitrarily from all MLB players (including pitchers, which would be silly). So lets restrict our focus to only the best hitters. Even the best players only hit, say for easy math, .333, which already makes your job still more difficult than predicting 57 straight coin tosses. At this rate, \\((\frac{1}{3})^{57}\*100 = 6.3692527e-26\\). Still not worth playing.

However, baseball as a sport, has a fantastic wealth of statistical categories, including one I thought might make a real dent in our success: career average against today's pitcher. Some batters just see certain pitchers really well, for whatever reason. Historical averages seem like better aids than seasonal averages, because they limit anomalies. After all, we only want the best, and want to do it easily. Since there are tons of combinations every day, I thought the odds were pretty good that at least one batter each day would have a reasonable (>50%) chance to earn a hit. Of course, there are all sorts of variables I'm ignoring, like if a pitcher is just terrible (everyone hits well against them!) than he's likely to be taken out early, or if the hitter has recently succumbed to degraded play (their recent average matters more than their historical average), etc. On the lineup on [rotowire](http://www.rotowire.com/baseball/matchup.htm), the ten "hot" hitters for today (June 23, 2014) features: Jarrod Saltalamacchia, Ryan Howard, Jimmy Rollins, Todd Frazier, Devin Mesoraco, Jayson Werth, David Ortiz, Endy Chavez and Chris Denorfia. Of those ten, eight earned at least one hit (some with more than one), one didn't earn a hit (what's new Jarrod Saltalamaccia?) and one did not play (Denorfia). DNPs count as a pass in the game, but I'll just ignore them for simplicity's sake. Given an 80 percent daily success rate, our game success rate is \\((\frac{8}{10})^{57}\*100 = 0.00029931553\\), which is just depressing.

Fiddling with the numbers in reverse, I was curious to see what sort of daily success rate we'd need to have a "reasonable" amount of success playing the game. 93% daily success rate allows us to pass a single percentage of game success, which still isn't great. 96% daily success gets us to close to 10% game success, which is where I'd draw the line for "reasonable." Unfortunately, this is in the zone where lots of money is spent on computational AI research, so this isn't really feasible for a layman.

Conclusion: I'd recommend playing something else.
