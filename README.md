# Just-cut-it

Because I want to cut it as soon as possible

## the configuration :

```JavaScript
{
  CRON_DELAY: 30, // in minutes : integer
  MAILS: [], // arrays of emails : string
  TARGET: {
    _base: "https://www.doctotruc.truc/availabilities.json", // the link to docto truc  : string
    start_date: toDay(), // the toDay date: string with the format YYYY-MM-DD
    visit_motive_ids: 1, // motive id : integer
    agenda_ids: 1, // agenda id  : integer
    insurance_sector: "public", // insurance type (yes it's important ) : string
    practice_ids: 1, // practitioner id : integer
    limit: 4, // limit ... yes there is a limit I don't hav yes tested it : integer
  },
  KILL_DATE: "YYYY-MM-DD", // your current appointment date : String with the format YYYY-MM-DD
}
```

`KILL_DATE` : Okey I think you need an explenation when I started to develop this script was searching for a good name for it... And the first think on my mind was : "Oh I just want to kill this date"

Yes that's dumb but it's clear for me 😅
