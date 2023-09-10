import { ProductType } from '@commercetools/platform-sdk';

export const mockProductType: ProductType = {
  id: '9e1fc8c0-e73d-426f-b008-c9e49798036a',
  version: 2,
  createdAt: '2023-08-29T00:04:12.373Z',
  lastModifiedAt: '2023-09-02T13:30:43.837Z',
  name: 'main',
  description: 'Sunrise Product Data Set Structure',
  attributes: [
    {
      name: 'creationDate',
      label: {
        en: 'Date of Creation',
      },
      isRequired: false,
      type: {
        name: 'datetime',
      },
      attributeConstraint: 'None',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
    {
      name: 'brand',
      label: {
        en: 'Brand',
      },
      isRequired: true,
      type: {
        name: 'lenum',
        values: [
          {
            key: 'artesia',
            label: {
              en: 'Artesia',
            },
          },
          {
            key: 'ringway',
            label: {
              en: 'Ringway',
            },
          },
          {
            key: 'yamaha',
            label: {
              en: 'Yamaha',
            },
          },
          {
            key: 'samMartin',
            label: {
              en: 'Sam Martin',
            },
          },
          {
            key: 'behringer',
            label: {
              en: 'Behringer',
            },
          },
          {
            key: 'cme',
            label: {
              en: 'CME',
            },
          },
          {
            key: 'aria',
            label: {
              en: 'Aria',
            },
          },
          {
            key: 'greenland',
            label: {
              en: 'Greenland',
            },
          },
          {
            key: 'sevillia',
            label: {
              en: 'Sevillia',
            },
          },
          {
            key: 'schecter',
            label: {
              en: 'Schecter',
            },
          },
          {
            key: 'kaimana',
            label: {
              en: 'Kaimana',
            },
          },
          {
            key: 'meinl',
            label: {
              en: 'Meinl',
            },
          },
          {
            key: 'proMark',
            label: {
              en: 'ProMark',
            },
          },
          {
            key: 'hitman',
            label: {
              en: 'Hitman',
            },
          },
          {
            key: 'virtuozo',
            label: {
              en: 'Virtuozo',
            },
          },
          {
            key: 'tomasVagner',
            label: {
              en: 'Tomas Vagner',
            },
          },
        ],
      },
      attributeConstraint: 'SameForAll',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
    {
      name: 'manufacturer',
      label: {
        en: 'Manufacturer',
      },
      isRequired: false,
      type: {
        name: 'lenum',
        values: [
          {
            key: 'china',
            label: {
              en: 'China',
            },
          },
          {
            key: 'indonesia',
            label: {
              en: 'Indonesia',
            },
          },
          {
            key: 'india',
            label: {
              en: 'India',
            },
          },
          {
            key: 'japan',
            label: {
              en: 'Japan',
            },
          },
          {
            key: 'southKorea',
            label: {
              en: 'South Korea',
            },
          },
          {
            key: 'usa',
            label: {
              en: 'USA',
            },
          },
          {
            key: 'thailand',
            label: {
              en: 'Thailand',
            },
          },
        ],
      },
      attributeConstraint: 'SameForAll',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
    {
      name: 'color',
      label: {
        en: 'Color',
      },
      isRequired: false,
      type: {
        name: 'lenum',
        values: [
          {
            key: 'blue',
            label: {
              en: 'Blue',
            },
          },
          {
            key: 'pink',
            label: {
              en: 'Pink',
            },
          },
          {
            key: 'white',
            label: {
              en: 'White',
            },
          },
          {
            key: 'black',
            label: {
              en: 'Black',
            },
          },
          {
            key: 'rosewood',
            label: {
              en: 'Rosewood',
            },
          },
          {
            key: 'blackGlossBlack',
            label: {
              en: 'Black gloss black',
            },
          },
          {
            key: 'whiteAsh',
            label: {
              en: 'White ash',
            },
          },
          {
            key: 'satinBlackWalnut',
            label: {
              en: 'Satin black walnut',
            },
          },
          {
            key: 'satinDarkWalnut',
            label: {
              en: 'Satin dark walnut',
            },
          },
          {
            key: 'satinMahogany',
            label: {
              en: 'Satin mahogany',
            },
          },
          {
            key: 'silver',
            label: {
              en: 'Silver',
            },
          },
          {
            key: 'natural',
            label: {
              en: 'Natural',
            },
          },
          {
            key: 'naturalSatin',
            label: {
              en: 'Natural satin',
            },
          },
          {
            key: 'naturalMatte',
            label: {
              en: 'Natural matte',
            },
          },
          {
            key: 'brownSunburst',
            label: {
              en: 'Brown sunburst',
            },
          },
          {
            key: 'tobaccoSunburst',
            label: {
              en: 'Tobacco sunburst',
            },
          },
          {
            key: 'blueSunburst',
            label: {
              en: 'Blue sunburst',
            },
          },
          {
            key: '3ToneSunburst',
            label: {
              en: '3 tone sunburst',
            },
          },
          {
            key: 'stainedBrown',
            label: {
              en: 'Stained brown',
            },
          },
          {
            key: 'metallicBlue',
            label: {
              en: 'Metallic blue',
            },
          },
          {
            key: 'candyAppleRed',
            label: {
              en: 'Candy apple red',
            },
          },
          {
            key: 'metallicSilver',
            label: {
              en: 'Metallic silver',
            },
          },
          {
            key: 'seeThroughBlue',
            label: {
              en: 'See through blue',
            },
          },
          {
            key: 'seeThroughWineRed',
            label: {
              en: 'See through wine red',
            },
          },
          {
            key: 'metallicBlack',
            label: {
              en: 'Metallic black',
            },
          },
          {
            key: 'metallicRed',
            label: {
              en: 'Metallic red',
            },
          },
          {
            key: 'midnightSatinBlack',
            label: {
              en: 'Midnight satin black',
            },
          },
          {
            key: 'hotRodRed',
            label: {
              en: 'Hot rod red',
            },
          },
          {
            key: 'blackCherryBurst',
            label: {
              en: 'Black cherry burst',
            },
          },
          {
            key: 'charcoalBurst',
            label: {
              en: 'Charcoal burst',
            },
          },
          {
            key: 'crimsonRedBurst',
            label: {
              en: 'Crimson red burst',
            },
          },
          {
            key: 'crimsonRed',
            label: {
              en: 'Crimson red',
            },
          },
          {
            key: 'satinWhite',
            label: {
              en: 'Satin white',
            },
          },
          {
            key: 'satinSilver',
            label: {
              en: 'Satin silver',
            },
          },
          {
            key: 'walnutSatin',
            label: {
              en: 'Walnut satin',
            },
          },
          {
            key: 'electricBlue',
            label: {
              en: 'Electric blue',
            },
          },
          {
            key: 'satinBlack',
            label: {
              en: 'Satin black',
            },
          },
          {
            key: 'satinMetallicLightBlue',
            label: {
              en: 'Satin metallic light blue',
            },
          },
          {
            key: 'oceanBlueBurst',
            label: {
              en: 'Ocean blue burst',
            },
          },
          {
            key: 'vintageSunburst',
            label: {
              en: 'Vintage sunburst',
            },
          },
          {
            key: 'electricMagenta',
            label: {
              en: 'Electric magenta',
            },
          },
          {
            key: 'titanium',
            label: {
              en: 'Titanium',
            },
          },
          {
            key: 'vintageWhite',
            label: {
              en: 'Vintage white',
            },
          },
          {
            key: 'blackCherry',
            label: {
              en: 'Black cherry',
            },
          },
          {
            key: 'agedBlackSatin',
            label: {
              en: 'Aged black satin',
            },
          },
          {
            key: 'charcoal',
            label: {
              en: 'Charcoal',
            },
          },
          {
            key: 'seeThruBlueBurst',
            label: {
              en: 'See thru blue burst',
            },
          },
          {
            key: 'auroraBurst',
            label: {
              en: 'Aurora burst',
            },
          },
          {
            key: 'aquaBurst',
            label: {
              en: 'Aqua burst',
            },
          },
          {
            key: 'transBlackBurst',
            label: {
              en: 'Trans black burst',
            },
          },
          {
            key: 'satinCharcoalBurst',
            label: {
              en: 'Satin charcoal burst',
            },
          },
          {
            key: 'satinSkyBurst',
            label: {
              en: 'Satin sky burst',
            },
          },
          {
            key: 'satinInfernoBurst',
            label: {
              en: 'Satin inferno burst',
            },
          },
          {
            key: 'blueMetallic',
            label: {
              en: 'Blue metallic',
            },
          },
          {
            key: 'redMetallic',
            label: {
              en: 'Red metallic',
            },
          },
          {
            key: 'yellowNaturalSatin',
            label: {
              en: 'Yellow natural satin',
            },
          },
          {
            key: 'seeThruBlack',
            label: {
              en: 'See thru black',
            },
          },
          {
            key: 'violinSunburst',
            label: {
              en: 'Violin sunburst',
            },
          },
          {
            key: 'cherrySunburst',
            label: {
              en: 'Cherry sunburst',
            },
          },
          {
            key: 'redSunburst',
            label: {
              en: 'Red sunburst',
            },
          },
          {
            key: 'pinkMatte',
            label: {
              en: 'Pink matte',
            },
          },
          {
            key: 'purpleMatte',
            label: {
              en: 'Purple matte',
            },
          },
          {
            key: 'redMatte',
            label: {
              en: 'Red matte',
            },
          },
          {
            key: 'blueMatte',
            label: {
              en: 'Blue matte',
            },
          },
          {
            key: 'greenMatte',
            label: {
              en: 'Green matte',
            },
          },
          {
            key: 'yellowMatte',
            label: {
              en: 'Yellow matte',
            },
          },
          {
            key: 'whiteMatte',
            label: {
              en: 'White matte',
            },
          },
          {
            key: 'naturalMeranti',
            label: {
              en: 'Natural meranti',
            },
          },
          {
            key: 'purple',
            label: {
              en: 'Purple',
            },
          },
          {
            key: 'red',
            label: {
              en: 'Red',
            },
          },
        ],
      },
      attributeConstraint: 'None',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
    {
      name: 'isOnStock',
      label: {
        en: 'On stock',
      },
      isRequired: false,
      type: {
        name: 'boolean',
      },
      attributeConstraint: 'None',
      isSearchable: true,
      inputHint: 'SingleLine',
    },
  ],
  key: 'main',
};
