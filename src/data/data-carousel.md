
# Hero Carousel

## Object types

### 1. “Number Stats”
  
    {
      "key": [number],
      "type": numberStats,
      "content: {
        "headline": [text],
        "description": [text],
        "data": [
          {
            "name": [text],
            "value: [number]
          }
        ]
      }
    }
  -  style: details-panel takes 75%? width, data-panel takes 25%? width

### 2. “Dataset Info/List”
  
    {
      "key": [number],
      "type": dataList,
      "headline": [text],
      "description": [text],
      "data": [
        {
          "name": [text]
        }
      ]
    }

  - style notes: details-panel takes 50% width, data-panel takes 50% width

### 3. “Testimonial”

    {
      "key": [number],
      "type": testimonial,
      "quote": [text],
      "attribution": [text],
    }

  - style notes: details-panel takes the full width, no data panel (no overlay)

## Logic

- Wrapper component that takes data.type as a prop
- dataType = {data.type}
- default style is with the original 75/25 overlay
- in each component, a style is defined for that object type
- for example, in the details panel, you'd have:

const testimonialStyle = {
  width: 100%
}
const dataListStyle = {
  width: 50%

}

<DataCarousel dataType={data.type}>
  <DetailsPanel style={`${dataType}`Style}> (ex: style=testimonialStyle)
  <DataPanel style={dataType}>
</DataCarousel>