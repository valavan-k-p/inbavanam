# Source notes

Every factual statement on the site must trace back to one of these sources.
The client source files live in `prompt/` (kept out of git).

## Sources

1. **Master website brief**: `prompt/INBAVANAM_MASTER_WEBSITE_PROMPT.md`
2. **Full-stack architecture blueprint**: `prompt/Inbavanam_Fullstack_Architecture.pdf`
3. **Stakeholder audio**: summarised in the brief (section 55). The original
   recording and transcript have not been supplied to this repository.
4. **Existing-website review document**: summarised in the brief (section 56).
5. **Logo, colour, navigation and kolam references**: the logo is at
   `public/brand/logo.png`; the other reference images were not supplied as files.

## Facts in use

| Statement on the site                                                                                    | Source                                 | Status                                                      |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| About 5.5 acres near Karamadai, in the Mettupalayam and Coimbatore region of Tamil Nadu                  | Audio                                  | In use                                                      |
| Run by Gladston Xavier and Florina Xavier                                                                | Audio                                  | In use                                                      |
| Both founders are social workers                                                                         | Audio                                  | In use                                                      |
| The organisation is self-funded                                                                          | Audio ("according to the stakeholder") | In use, attributed to the founders                          |
| The concept is Auroville-inspired                                                                        | Audio ("according to the stakeholder") | In use on About, attributed to the founders; needs sign-off |
| Used for relaxation, camps, group stays, weddings and events, and corporate outings                      | Audio                                  | In use (Experiences)                                        |
| Work with surrounding tribal and Scheduled Caste communities on education, health and economic wellbeing | Audio                                  | In use                                                      |
| Agricultural support has included teaching agriculture and providing land for people to use              | Audio                                  | In use                                                      |
| Architecturally significant stone construction; the stones are extremely heavy                           | Audio                                  | In use, material name withheld                              |
| Natural cooling; no conventional air conditioning in at least the referenced building                    | Audio                                  | In use with cautious wording, `verified: false`             |
| The founders recorded about five videos, including architecture walkthroughs                             | Audio                                  | In use as "recorded walkthroughs"                           |
| Sesame was grown on site, with the aim of pressing it for oil                                            | Review document                        | In use as a past-tense statement                            |
| Vegetables and herbs are dried on site into powders for additional nutrition                             | Review document                        | In use                                                      |
| A bird list and a short plant album are being prepared                                                   | Review document                        | In use as "being prepared"                                  |
| Program names (Peacebuilding, WISDOM Workshops, and so on)                                               | Review document                        | Used verbatim in `src/data/programs.ts`                     |

## Deliberately not used

- Room counts, names, prices, capacities or amenities
- Phone numbers, email addresses, street address
- Check-in times, booking and cancellation policies
- Event dates
- Founder degrees, job history or credentials
- The exact stone or material name
- Certifications, awards, statistics, partner names, program results
- Reviews or testimonials of any kind

## Program grouping

The review document lists programs without grouping. The brief (section 15)
proposes a grouping; `src/data/programs.ts` follows it, with one change:
training programs (WISDOM Workshops, Outbound Trainings, Organizational
Capacity Building) sit with Education under "Education and Training", because
the review asks for easier navigation to training information.
