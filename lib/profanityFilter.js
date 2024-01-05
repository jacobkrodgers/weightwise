const {
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} = require('obscenity');

export const profanityFilter = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});