import {boostColorValues} from '@/components/utilities/boostColors.tsx'

export const initializeScoreReducerState = (allWeights) => {
  return {
    score: 1,
    currentWeightedLevelKey: 1,
    allWeightedLevels: allWeights,
    possibleKeys: Object.keys(allWeights),
  }
}

export function scoreReducer(state, action) {
  switch (action.type) {
    case 'correct':
      return {
        ...state,
        score:
          state.score +
          state.allWeightedLevels[state.currentWeightedLevelKey] *
            action.payload,
      }
    case 'incorrect':
      return {
        ...state,
      }
    case 'nextWeightedLevel':
      if (
        state.currentWeightedLevelKey !==
        parseInt(state.possibleKeys[state.possibleKeys.length - 1])
      ) {
        return {
          ...state,
          currentWeightedLevelKey: state.currentWeightedLevelKey + 1,
        }
      } else {
        return {
          ...state,
        }
      }
    default:
      throw new Error('Unknown action type')
  }
}

export function successReducer(state, action) {
  switch (action.type) {
    case 'correct':
      if (action.payload > state.stringSuccessIndex) {
        const newTotalCorrectCount = state.totalCorrectCount + 1
        const successIndex =
          action.payload > state.stringSuccessIndex
            ? action.payload
            : state.stringSuccessIndex
        return {
          ...state,
          stringSuccessIndex: successIndex,
          initialErrorIndex: null,
          totalCorrectCount: newTotalCorrectCount,
          progressState: newTotalCorrectCount,
        }
      } else {
        return {
          ...state,
        }
      }

    case 'incorrect':
      return {
        ...state,
        initialErrorIndex: action.payload,
        progressState: null,
      }
    case 'resetErrorIndex':
      return {
        ...state,
        initialErrorIndex: null,
      }
    case 'progressLevel':
      return {
        ...state,
        stringSuccessIndex: null,
      }
  }
}

export const initialBoostState = {
  boostProgress: 0,
  boostLevel: 1,
  boostColorValues: boostColorValues,
  bgBoostColor: boostColorValues[0],
  incrementingBoostColor: boostColorValues[1],
  forceNewRenderKey: 0,
}

//bgBoost is always one behind incrementingBoost color

export function boostReducer(state, action) {
  switch (action.type) {
    case 'decrement':
      if (state.boostProgress <= 1) {
        if (state.boostLevel === 1) {
          return {
            ...state,
            boostProgress: 0,
          }
        } else {
          const prevBoostLevel = Math.floor(state.boostLevel / 2)
          return {
            ...state,
            boostLevel: prevBoostLevel,
            bgBoostColor:
              state.boostColorValues[Math.floor(prevBoostLevel / 2)],
            incrementingBoostColor: state.boostColorValues[prevBoostLevel],
            boostProgress: 100,
            forceNewRenderKey: ++state.forceNewRenderKey,
          }
        }
      } else {
        return {
          ...state,
          boostProgress: state.boostProgress - 5,
        }
      }

    case 'increment':
      if (state.boostProgress >= 100) {
        const nextBoostLevel = state.boostLevel * 2
        return {
          ...state,
          bgBoostColor: state.boostColorValues[state.boostLevel],
          incrementingBoostColor: state.boostColorValues[nextBoostLevel],
          boostLevel: nextBoostLevel,
          boostProgress: 0,
          forceNewRenderKey: ++state.forceNewRenderKey,
        }
      } else {
        return {
          ...state,
          boostProgress: state.boostProgress + 10,
        }
      }
    case 'clear':
      return {
        ...state,
        boostProgress: 0,
        boostLevel: 1,
        bgBoostColor: state.boostColorValues[0],
        incrementingBoostColor: state.boostColorValues[1],
        forceNewRenderKey: ++state.forceNewRenderKey,
      }
  }
}
