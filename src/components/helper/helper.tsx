import React from 'react'
import { GatsbyLinkProps, Link as GLink } from 'gatsby'


type CustomGatsbyLinkProps = Omit<GatsbyLinkProps<{}>, 'ref'>

const Link: React.FC<CustomGatsbyLinkProps> = ({
  className,
  children,
  ...props
}) => (
  <GLink  {...props}>
    {children}
  </GLink>
)

export default Link