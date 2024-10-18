import {
  Datagrid,
  List,
  NumberField,
  TextField,
  Show,
  SimpleShowLayout,
  TextInput,
  Edit,
  SimpleForm,
  NumberInput,
  Create,
  ImageInput,
  ImageField,
} from "react-admin";

export const ProductList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="price" />
      <NumberField source="quantity" />
    </Datagrid>
  </List>
);

export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ImageField source="image" src="image"
      sx={{ '& img': { maxWidth: 200, maxHeight: 200, objectFit: 'contain' } }}

      />
      <TextField source="description" />
      <TextField source="price" />
      <NumberField source="quantity" />
      <NumberField source="seller" />
    </SimpleShowLayout>
  </Show>
);

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" slotProps={{ htmlInput: { disabled: true } }} />
      <TextInput source="name" />
      <TextInput source="description" multiline rows={5} />
      <TextInput source="price" />
      <NumberInput source="quantity" />
      <NumberInput
        source="seller"
        slotProps={{ htmlInput: { disabled: true } }}
      />
    </SimpleForm>
  </Edit>
);


export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <ImageInput source="image" accept={{ "image/*": [".png", ".jpg"] }}>
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="description" multiline rows={5} />
      <NumberInput source="price" />
      <NumberInput source="quantity" />
    </SimpleForm>
  </Create>
);
