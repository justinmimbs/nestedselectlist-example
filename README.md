# nestedselectlist-example

Example usage of a `NestedSelectList` component for React.

The `NestedSelectList` component displays a menu of nested options all at once, allowing a user to see the full hierarchy and select an item at any level with one click.

![example.png](./screenshots/example.png?raw=true)

```js
let values = [
      {
        key: "Asia",
        values: [
          {
            key: "China",
            values: [
              {key: "Beijing"},
              {key: "Shanghai"}
            ]
          },
          {
            key: "Japan",
            values: [
              {key: "Osaka"},
              {key: "Sapporo"},
              {key: "Tokyo"}
            ]
          }
        ]
      }
    ];
```

```jsx
<NestedSelectList values={values} selectedKey="Japan" onSelectItem={handleSelectItem} />
```
