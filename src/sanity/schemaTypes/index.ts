import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './heroType'
import { aboutHeroType } from './aboutHeroType'
import { sectionTitlesType } from './sectionTitlesType'
import { faqType } from './faqType'
import { newsEventType } from './newsEventType'
import { testimonialType } from './testimonialType'
import { benefitType } from './benefitType'
import { serviceHeroType } from './serviceHeroType'
import { servicesPageType } from './servicesPageType'
import { ctaType } from './ctaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType, ctaType, servicesPageType, serviceHeroType, aboutHeroType, sectionTitlesType, testimonialType, faqType, newsEventType, benefitType],
}
