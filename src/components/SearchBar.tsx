import { Input, InputProps } from 'antd'

const SearchBar = (props: InputProps) => {
  const { onChange } = props
  return (
    <Input
      {...props}
      placeholder="Search from start of product name"
      allowClear
      onChange={onChange}
    />
  )
}

export default SearchBar
