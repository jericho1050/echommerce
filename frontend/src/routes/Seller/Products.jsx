import {
  ArrayField,
  ChipField,
  Datagrid,
  List,
  InfiniteList,
  SingleFieldList,
  TextField,
} from 'react-admin';

export const ProductList = () => (
  <InfiniteList>
    <Datagrid>
      <TextField source='__typename' />
      <TextField source='id' />
      <TextField source='name' />
      <ArrayField source='media'>
        <SingleFieldList>
          <ChipField source='__typename' />
        </SingleFieldList>
      </ArrayField>
      <TextField source='collections' />
    </Datagrid>
  </InfiniteList>
);
