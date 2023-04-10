import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={456}
    viewBox="0 0 280 456"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="128" cy="129" r="120" /> 
    <rect x="0" y="271" rx="0" ry="0" width="280" height="24" /> 
    <rect x="-1" y="313" rx="0" ry="0" width="280" height="84" /> 
    <rect x="0" y="413" rx="0" ry="0" width="95" height="27" /> 
    <rect x="124" y="406" rx="20" ry="20" width="150" height="44" />
  </ContentLoader>
)

export default Skeleton