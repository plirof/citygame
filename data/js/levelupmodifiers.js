/// <reference path="js/playermodifiers.d.ts" />
var levelUpModifiers;
(function (levelUpModifiers) {
    levelUpModifiers.testModifier = {
        type: "testModifier",
        title: "testing",
        description: "test",
        effects: [
            {
                targets: ["global"],
                addedProfit: 50
            },
            {
                targets: ["fastfood"],
                multiplier: 4
            }
        ]
    };

    /////////////
    // LEVEL 5 //
    /////////////
    levelUpModifiers.fundingBoost1 = {
        type: "fundingBoost1",
        title: "Starting capital",
        description: "+200$",
        unlockConditions: [
            {
                type: "level",
                value: 5
            }
        ],
        uniqueEffect: function (player) {
            player.addMoney(200);
        }
    };

    levelUpModifiers.clicksPerParking = {
        type: "clicksPerParking",
        title: "Clicks per parking",
        description: "+0.2$ / click for every parking lot",
        unlockConditions: [
            {
                type: "level",
                value: 5
            }
        ],
        dynamicEffect: {
            "parkinglot": function (player) {
                player.addSpecialModifier({
                    type: "clicksPerParking",
                    title: "Clicks per parking",
                    description: "+0.2$ / click for every parking lot",
                    effects: [
                        {
                            targets: ["click"],
                            addedProfit: player.amountBuiltPerType["parkinglot"] * 0.2
                        }
                    ]
                });
            }
        }
    };

    levelUpModifiers.clicksPerLevel1 = {
        type: "clicksPerLevel1",
        title: "Reverse carpal tunnel syndrome",
        description: "Clicking profit * 1.02 per level",
        unlockConditions: [
            {
                type: "level",
                value: 5
            }
        ],
        dynamicEffect: {
            "level": function (player) {
                player.addSpecialModifier({
                    type: "clicksPerLevel1",
                    title: "Reverse carpal tunnel syndrome",
                    description: "Clicks * 1.02 per level",
                    effects: [
                        {
                            targets: ["click"],
                            multiplier: 1 + (player.level * 0.02)
                        }
                    ]
                });
            }
        }
    };

    levelUpModifiers.increasedLevelUpModifiers = {
        type: "increasedLevelUpModifiers",
        title: "Increased knowledge",
        description: ["Choose from one extra modifier", "(if available) on subsequent level ups"],
        unlockConditions: [
            {
                type: "level",
                value: 5
            }
        ],
        uniqueEffect: function (player) {
            player.levelUpModifiersPerLevelUp++;
        }
    };

    levelUpModifiers.shoppingCostReduction1 = {
        type: "shoppingCostReduction1",
        title: "Supply chain",
        description: "Shopping buildings 20% cheaper to build",
        unlockConditions: [
            {
                type: "level",
                value: 5
            }
        ],
        effects: [
            {
                targets: ["shopping"],
                buildCost: {
                    multiplier: 0.8
                }
            }
        ]
    };

    levelUpModifiers.parkingCostReduction1 = {
        type: "parkingCostReduction1",
        title: "Discount asphalt",
        description: "Parking lots 35% cheaper to build",
        unlockConditions: [
            {
                type: "level",
                value: 5
            }
        ],
        effects: [
            {
                targets: ["parking"],
                buildCost: {
                    multiplier: 0.65
                }
            }
        ]
    };

    //////////////
    // LEVEL 10 //
    //////////////
    levelUpModifiers.fundingBoost2 = {
        type: "fundingBoost2",
        title: "More starting capital",
        description: "+500$",
        unlockConditions: [
            {
                type: "level",
                value: 10
            }
        ],
        uniqueEffect: function (player) {
            player.addMoney(500);
        }
    };

    levelUpModifiers.betterSellPrice1 = {
        type: "betterSellPrice1",
        title: "Real estate flipping",
        description: [
            "Get back an additional 15% of the cost",
            "when selling buildings and land"],
        unlockConditions: [
            {
                type: "level",
                value: 10
            }
        ],
        uniqueEffect: function (player) {
            player.modifierEffects.sellPrice += 0.15;
        }
    };

    levelUpModifiers.increasedRecruitQuality1 = {
        type: "increasedRecruitQuality1",
        title: "Promising talent",
        description: ["Better new recruits"],
        unlockConditions: [
            {
                type: "level",
                value: 10
            }
        ],
        uniqueEffect: function (player) {
            player.modifierEffects.recruitQuality += 0.25;
        }
    };

    //////////////
    // LEVEL 25 //
    //////////////
    levelUpModifiers.fundingBoost3 = {
        type: "fundingBoost3",
        title: "External investors",
        description: "+2000$",
        unlockConditions: [
            {
                type: "level",
                value: 25
            }
        ],
        uniqueEffect: function (player) {
            player.addMoney(2000);
        }
    };

    //////////////
    // LEVEL 50 //
    //////////////
    levelUpModifiers.increasedRecruitQuality2 = {
        type: "increasedRecruitQuality2",
        title: "Talent scouts",
        description: "Significantly better recruits",
        unlockConditions: [
            {
                type: "level",
                value: 50
            }
        ],
        uniqueEffect: function (player) {
            player.modifierEffects.recruitQuality += 0.75;
        }
    };

    levelUpModifiers.modifiersByUnlock = (function () {
        var base = {};

        for (var _mod in levelUpModifiers) {
            var modifier = levelUpModifiers[_mod];
            if (modifier.unlockConditions) {
                for (var i = 0; i < modifier.unlockConditions.length; i++) {
                    var condition = modifier.unlockConditions[i];

                    if (condition === "default") {
                        if (!base.default)
                            base.default = [];
                        base.default.push(modifier);
                        continue;
                    }

                    if (!base[condition.type])
                        base[condition.type] = {};

                    if (!base[condition.type][condition.value]) {
                        base[condition.type][condition.value] = [];
                    }

                    base[condition.type][condition.value].push(modifier);
                }
            }
        }
        return base;
    })();

    levelUpModifiers.allModifiers = (function () {
        var all = [];
        for (var _mod in levelUpModifiers) {
            if (levelUpModifiers[_mod].type) {
                all.push(levelUpModifiers[_mod]);
            }
        }
        return all;
    })();
})(levelUpModifiers || (levelUpModifiers = {}));
//# sourceMappingURL=levelupmodifiers.js.map