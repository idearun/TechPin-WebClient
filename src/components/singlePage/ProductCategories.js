import React from 'react'
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline'
import { Link } from 'react-router'

const CategoryTag = ({ name_en, slug }) => (
  <Link to={`/categories/${slug}`}>
    <span className="category-tag">{name_en}</span>
  </Link>
)

const ProductCategories = ({ categories = [], isLoading }) =>
  isLoading ? (
    <div />
  ) : (
    <div className="product-categories">
      <div>
        <ActionLabelOutline size={14} />
        <span>Categories</span>
      </div>
      <div>
        {categories.map(category => <CategoryTag {...category} key={category.id} />)}
      </div>
    </div>
  )

export default ProductCategories
