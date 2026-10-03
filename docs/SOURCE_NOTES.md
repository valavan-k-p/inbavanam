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
6. **Organisation profile**: `public/content/Inbavanam_Organisation_Profile.pdf`,
   compiled by the client from the existing Inbavanam website. It supplies the
   About page copy and the Organisation Profile section. Its own editorial note
   says figures and claims should be verified by Inbavanam before publication,
   and its section 18 lists what needs checking.

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

### From the organisation profile PDF

| Statement on the site                                                                                                                         | Source                                     | Status                                |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------- |
| Inbavanam means "happy forest"                                                                                                                | Profile, section 1                         | In use (About)                        |
| A community-development initiative working with marginalised communities in and around Kandiyur and Bagavathi Amman Koil, Coimbatore district | Profile, sections 1 and 17                 | In use (About)                        |
| The work began with two priorities: education and sustainable livelihoods                                                                     | Profile, sections 1 and 17                 | In use (About)                        |
| Learning centres, counselling, mentorship, scholarships and higher-education support, including first-generation learners entering college    | Profile, section 17                        | In use (About)                        |
| Community-based agriculture, natural farming, livestock rearing and fish culture, supporting landless agricultural workers                    | Profile, section 17                        | In use (About)                        |
| The eight-point vision and purpose list                                                                                                       | Profile, section 2, quoted almost verbatim | In use (About)                        |
| Communities served, programme pillars, resource centre and core approach                                                                      | Profile, sections 3 to 15                  | In use (Organisation Profile section) |

The About page copy is written in plain English. The wording is the site's
own; the facts, figures and programme names behind it are the profile's, and
nothing has been added to it.

The About page carries no founder biography or portrait: the profile PDF names
no individuals, and the founder details that were there came from the audio.

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
