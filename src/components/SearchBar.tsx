import { Input, InputProps } from 'antd'

const SearchBar = (props: InputProps) => {
  const { onChange } = props
  return (
    <Input
      data-testid="search-bar"
      {...props}
      placeholder="Search from start of product name"
      allowClear
      onChange={onChange}
    />
  )
}

export default SearchBar
