import React, { useCallback } from "react"
import { useGlobals } from "@storybook/manager-api"
import { Icons, IconButton, WithTooltip, TooltipLinkList } from "@storybook/components"
import { styled, color } from "@storybook/theming"

import { PSEUDO_STATE, PSEUDO_STATES } from "./constants"

const LinkTitle = styled.span<{ active?: boolean }>(({ active }) => ({
  color: active ? color.secondary : "inherit",
}))

const LinkIcon = styled(Icons)<{ active?: boolean }>(({ active }) => ({
  opacity: active ? 1 : 0,
  path: { fill: active ? color.secondary : "inherit" },
}))

const options = Object.keys(PSEUDO_STATES).sort()

export const PseudoStateTool = () => {
  const [{ pseudo }, updateGlobals] = useGlobals()
  const isActive = useCallback((option: string | number) => pseudo?.[option] === true, [pseudo])

  const toggleOption = useCallback(
    (option: string | number) => () =>
      updateGlobals({ pseudo: { ...pseudo, [option]: !isActive(option) } }),
    [pseudo]
  )

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={() => (
        <TooltipLinkList
          links={options.map((option) => ({
            id: option,
            title: (
              <LinkTitle active={isActive(option)}>
                :{PSEUDO_STATES[option as keyof PSEUDO_STATE]}
              </LinkTitle>
            ),
            right: <LinkIcon icon="check" width={12} height={12} active={isActive(option)} />,
            onClick: toggleOption(option),
            active: isActive(option),
          }))}
        />
      )}
    >
      <IconButton
        key="pseudo-state"
        title="Select CSS pseudo states"
        active={options.some(isActive)}
      >
        <Icons icon="button" />
      </IconButton>
    </WithTooltip>
  )
}
