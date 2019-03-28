The most straightforward way to customize the Participant Visit Listing is by using a configuration object whose properties describe the behavior and appearance of the displays. The Participant Visit Listing object contains Webcharts both `table` and `chart` objects, and the user settings will overwrite the default settings of each of those objects. Refer to the Webcharts [table](https://github.com/RhoInc/Webcharts/wiki/Table-Configuration) and [chart](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) configuration wikis for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the Participant Visit Listing to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each participant-visit-listing setting as of version 1.2.0.

## settings.site_col
`string`

name of variable that captures site

**default:** `"site_name"`



## settings.id_col
`string`

name of variable that captures participant ID

**default:** `"subjectnameoridentifier"`



## settings.id_status_col
`string`

name of variable that captures participant status

**default:** `"subject_status"`



## settings.visit_col
`string`

name of variable that captures visit

**default:** `"visit_name"`



## settings.visit_order_col
`string`

name of variable that captures sort order of visit

**default:** `"visit_number"`



## settings.visit_date_col
`string`

name of variable that captures date of visit

**default:** `"visit_date"`



## settings.visit_day_col
`string`

name of variable that captures study day of visit

**default:** `"visit_day"`



## settings.visit_status_col
`string`

name of variable that captures status of visit

**default:** `"visit_status"`



## settings.visit_status_order_col
`string`

name of variable that captures sort order of visit status

**default:** `"visit_status_order"`



## settings.visit_text_col
`string`

name of variable that captures text to be printed in listing cells

**default:** `"visit_text"`



## settings.visit_status_color_col
`string`

name of variable that captures desired color of visit status

**default:** `"visit_status_color"`



## settings.visit_status_description_col
`string`

name of variable that captures a more detailed description of the visit status

**default:** `"visit_status_description"`



## settings.visit_expectation_pattern
`string`

this string will be converted to a regular expression that will identify visit statuses that represent overdue or future visits

**default:** `"/expect|future|overdue/i"`



## settings.visit_exclusion_pattern
`string`

this string will be converted to a regular expression that will identify unscheduled visits, e.g. unscheduled, repeat, and early termination visits

**default:** `"/unscheduled|early termination|repeat/i"`



## settings.visit_overdue_pattern
`string`

this string will be converted to a regular expression that will identify overdue visits

**default:** `"/overdue/i"`



## settings.visit_status_exclusion_col
`string`

name of variable that identifies visit statuses to exclude from visit status legend

**default:** `"plot_exclude"`



## settings.visit_status_exclusion_value
`string`

value of variable that identifies visit statuses to exclude from visit status legend

**default:** `"Yes"`



## settings.chart_layout
`string`

layout of charts, either each in their own tab or side-by-side in a single tab

**default:** `"tabbed"`



## settings.active_tab
`string`

name of tab that is displayed initially

**default:** `"Visit Chart"`



## settings.date_format
`string`

a strptime specification of time format directives, used to parse visit date

**default:** `"%Y-%m-%d"`



## settings.display_cell_text
`boolean`

controls the display of the listing, either as a heat map or as a listing

**default:** `false`



## settings.chart_margin
`object`

controls the margins around the chart canvas, e.g. for the axes; modify as needed to create space for rotated x-axis tick labels

### settings.chart_margin.top
`number`

space above the chart canvas

**default:** `100`

### settings.chart_margin.right
`number`

space to the right of the chart canvas

**default:** none

### settings.chart_margin.bottom
`number`

space below the chart canvas; if unspecified, imputed to fit x-axis

**default:** `100`

### settings.chart_margin.left
`number`

space to the left of the chart canvas; if unspecified, imputed to fit y-axis

**default:** none



## settings.filter_cols
`array`

custom filter variables, in addition to site and participant status

**default:** none

# Webcharts settings
The objects below contain Webcharts settings for each display as of version 1.2.0 of the Participant Visit Listing.

## Listing
```
{
    "pagination": false,
    "exports": [
        "csv"
    ]
}
```

## Ordinal Chart
```
{
    "x": {
        "type": "ordinal",
        "label": "Visit",
        "value_col": null
    },
    "y": {
        "type": "ordinal",
        "label": "",
        "value_col": null,
        "range_band": 15,
        "behavior": "flex",
        "sort": "alphabetical-descending"
    },
    "marks": [
        {
            "type": "circle",
            "per": null,
            "tooltip": null,
            "radius": 5,
            "attributes": {
                "fill-opacity": 1
            },
            "values": {}
        },
        {
            "type": "circle",
            "per": null,
            "tooltip": null,
            "radius": 4,
            "attributes": {
                "fill-opacity": 1,
                "fill": "white"
            },
            "values": {
                "expected": [
                    true
                ],
                "unscheduled": [
                    false
                ]
            }
        }
    ],
    "color_by": null,
    "color_dom": null,
    "legend": {
        "location": "top",
        "label": "Visit Status",
        "order": null
    },
    "gridlines": "y",
    "padding": 0,
    "scale_text": false
}
```

## Linear Chart
```
{
    "x": {
        "type": "linear",
        "label": "Study Day",
        "value_col": null,
        "format": "1d"
    },
    "y": {
        "type": "ordinal",
        "label": "",
        "value_col": null,
        "range_band": 15,
        "behavior": "flex",
        "sort": "alphabetical-descending"
    },
    "marks": [
        {
            "type": "circle",
            "per": null,
            "tooltip": null,
            "radius": 5,
            "attributes": {
                "fill-opacity": 1
            },
            "values": {}
        },
        {
            "type": "circle",
            "per": null,
            "tooltip": null,
            "radius": 4,
            "attributes": {
                "fill-opacity": 1,
                "fill": "white"
            },
            "values": {
                "expected": [
                    true
                ]
            }
        },
        {
            "type": "text",
            "per": null,
            "tooltip": null,
            "text": "[visitCharacter]",
            "attributes": {
                "font-size": "10px",
                "font-weight": "bold",
                "dx": 3,
                "dy": -3,
                "cursor": "default"
            },
            "values": {
                "unscheduled": [
                    true
                ]
            }
        }
    ],
    "color_by": null,
    "color_dom": null,
    "legend": {
        "location": "top",
        "label": "Visit Status",
        "order": null
    },
    "gridlines": "y",
    "padding": 0,
    "scale_text": false
}
```