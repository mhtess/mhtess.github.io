// examples stores the target sentences and an array of their corresponding context sentences
var examples = [{
	// warm and cold are not super context sensitive because of perception
	// the best example is of people from different places
	target: {
		positive: "warm",
		negative: "cold"
	},
	context: [
		" lives in Maryland and steps outside in Winter.",
		" lives in Maryland and steps outside in Fall.",
		" lives in Maryland and steps outside in Summer."
	],
	contextWithSuper: [
		" lives in Maryland and checks the weather everyday. They looks at the weather report for today, a day in Winter.",
		" lives in Maryland and checks the weather everyday. They looks at the weather report for today, a day in Fall.",
		" lives in Maryland and checks the weather everyday. They looks at the weather report for today, a day in Summer."
	],
	action: [
		" Imagine you live in Maryland and go outside on a day in Winter.",
		" Imagine you live in Maryland and go outside on a day in Fall.",
		" Imagine you live in Maryland and go outside on a day in Summer."
	],
	prompt: [
		"What do you think was the temperature outside?",
		"What do you think was the temperature outside?",
		"What do you think was the temperature outside?"
	],
	sub: {
		singular: [
			"day in Winter",
			"day in Fall",
			"day in Summer"
		],
		plural: [
			"days in Winter",
			"days in Fall",
			"days in Summer"
		]
	},
	super: [
		"days of the year",
		"days of the year",
		"days of the year"
	],
	strength: [1,2,3], // how high on the scale the sub-cat is expected to be
	degree: "temperature",
	unit: ["degrees Fahrenheit", "degrees Celsius"],
	subunit: ["none"]
},
{
	target: {
		positive: "expensive",
		negative: "cheap"
	},
	context: [
		" finds a bottle opener and looks at the price.",
		" finds a toaster and looks at the price.",
		" finds a dishwasher and looks at the price."
	],
	contextWithSuper: [
		" is browsing around a kitchen appliance store. They finds a bottle opener and looks at the price.",
		" is browsing around a kitchen appliance store. They finds a toaster and looks at the price.",
		" is browsing around a kitchen appliance store. They finds a dishwasher and looks at the price."
	],
	action: [
		"Imagine you are buying a bottle opener.",
		"Imagine you are buying a toaster.",
		"Imagine you are buying a dishwasher."
	],
	prompt: [
		"What do you think was the price of the bottle opener?",
		"What do you think was the price of the toaster?",
		"What do you think was the price of the dishwasher?"
	],
	sub: {
		singular: [
			"bottle opener",
			"toaster",
			"dishwasher"
		],
		plural: [
			"bottle openers",
			"toasters",
			"dishwashers"
		]
	},
	super: [
		"kitchen appliances",
		"kitchen appliances",
		"kitchen appliances"
	],
	strength: [1,2,3],
	degree: "price",
	unit: ["dollars"],
	subunit: ["none"]
},
{
	target: {
		positive: "long",
		negative: "short"
	},
	context: [
		// " was talking about the episode of the television show they just watched.",
		// " was talking about the informercial they just watched.", // with informercial, it seems to be a statement meaning "Long, relative to how long informercials SHOULD be" [see 20160106.txt notes]
		" finds a video of a cute animal to watch online with their friend.",
		" finds a music video to watch online with their friend.",
		" finds a movie to watch online with their friend."
		// " is about to show their friend an episode of a TV show.",
		// " is about to show their friend a movie."
	],
	contextWithSuper: [
		" is searching for things to watch online with their friend and finds a video of a cute animal.",
		" is searching for things to watch online with their friend and finds a music video.",
		" is searching for things to watch online with their friend and finds a movie."
	],
	action: [
		"Imagine you are about to watch a video of a cute animal online.",
		"Imagine you are about to watch a music video online.",
		"Imagine you are about to watch a movie online."
	],
	prompt: [
		// "What do you think was the duration of the television show?",
		"What do you think was the duration of the cute animal video?",
		"What do you think was the duration of the music video?",
		"What do you think was the duration of the movie?"
		// "What do you think was the duration of the movie?",
		// "What do you think was the duration of the television series?"
	],
	sub: {
		singular: [
			"video of the cute animal",
			"music video",
			"movie"
		],
		plural: [
			"videos of cute animals",
			"music videos",
			"movies"
		]
	},
	super: [
		"things you watch online",
		"things you watch online",
		"things you watch online"
	],
	strength: [1,2,3],
	degree: "time",
	unit: ["seconds", "minutes", "hours", "days"],
	subunit: ["seconds", "minutes", "hours"]
},
{
	target: {
		positive: " tall",
		negative: " short"
	},
	context: [
		" sees a professional gymnast.",
		" sees a professional soccer player.",
		" sees a professional basketball player."
	],
	contextWithSuper: [
		" is sitting at a cafe watching people go by and sees a professional gymnast.",
		" is sitting at a cafe watching people go by and sees a professional soccer player.",
		" is sitting at a cafe watching people go by and sees a professional basketball player."
	],
	action: [
		"Imagine you see a professional gymnast.",
		"Imagine you see a professional soccer player.",
		"Imagine you see a professional basketball player."
	],
	prompt: [
		"What do you think is the height of the gymnast?",
		"What do you think is the height of the soccer player?",
		"What do you think is the height of the basketball player?"
	],
	sub: {
		singular: [
			"gymnast",
			"soccer player",
			"basketball player"
		],
		plural: [
			"gymnasts",
			"soccer players",
			"basketball players"
		]
	},
	super: [
		"people",
		"people",
		"people"
	],
	strength: [1,2,3],
	degree: "height",
	unit: ["feet", "meters"],
	subunit: ["inches", "centimeters"]
},
{
	target: {
		positive: "heavy",
		negative: "light"
	},
	context : [
		" picks up a grape.",
		" picks up an apple.",
		" picks up a watermelon."
	],
	contextWithSuper: [
		" is in the produce section of the supermarket and picks up a grape.",
		" is in the produce section of the supermarket and picks up an apple.",
		" is in the produce section of the supermarket and picks up a watermelon."
	],
	action: [
		"Imagine you pick up a grape.",
		"Imagine you pick up an apple.",
		"Imagine you pick up a watermelon."
	],
	prompt: [
		"What do you think is the weight of the grape?",
		"What do you think is the weight of the apple?",
		"What do you think is the weight of the watermelon?"
	],
	sub: {
		singular: [
			"grape",
			"apple",
			"watermelon"
		],
		plural: [
			"grapes",
			"apples",
			"watermelons"
		]
	},
	super: [
		"produce",
		"produce",
		"produce"
	],
	strength: [1,2,3],
	degree: "weight",
	unit: ["pounds", "kilograms"],
	subunit: ["ounces", "grams"]
}];
