import ChallengeTool from '@/components/utilities/ChallengeTool.tsx';
import {useEffect, useReducer, useState} from 'react';
import {
  boostReducer, initialBoostState, initializeScoreReducerState, scoreReducer,
} from '@/hooks/challengeReducers.tsx';
import {useChallengeContext} from '@/components/challenge/ChallengeContext.tsx';
import BoostMeter from '@/components/challenge/BoostMeter.tsx';
import ProgressBar from '@/components/challenge/ProgressBar.tsx';
import {useStateContext} from '@/contexts/contextProvider.tsx';
import ChallengeCompletedResults from '@/components/challenge/ChallengeCompletedResults.tsx';

type Props = {
  progressState: number | null
}

export default function CurrentAttemptCompetitor({progressState}: Props) {
  const [timer, setTimer] = useState<number>(0);
  const [localSuccessCount, setLocalSuccessCount] = useState<number>(0);
  const [nextWeightedLevelThreshold, setNextWeightedLevelThreshold] = useState<number>(1000);
  const {challenge: {inProgress, completed, id: challengeId}} = useChallengeContext();
  const {user} = useStateContext();
  const userId = user?.id ?? -1;


  useEffect(() => {
    if (inProgress) {
      const intervalId = setInterval(() => {
        setTimer((currentTimer) => currentTimer + 1);
      }, 10);
      return () => clearInterval(intervalId);
    }
  }, [inProgress]);

  useEffect(() => {
    if (timer > nextWeightedLevelThreshold) {
      setNextWeightedLevelThreshold(prev => prev + 1000);
      scoreDispatch({type: 'nextWeightedLevel'});
    }
  }, [timer]);

  const {challenge} = useChallengeContext();
  const initialScoreReducerState = initializeScoreReducerState(challenge.allWeightedLevels);
  const [scoreState, scoreDispatch] = useReducer(scoreReducer, initialScoreReducerState);
  const [boostState, boostDispatch] = useReducer(boostReducer, initialBoostState);


  useEffect(() => {
    if (!progressState) {
      scoreDispatch({type: 'incorrect'});
      boostDispatch({type: 'clear'});
    } else if (progressState > localSuccessCount) {
      scoreDispatch({type: 'correct', payload: boostState.boostLevel});
      boostDispatch({type: 'increment'});
      setLocalSuccessCount(progressState);
    }
  }, [progressState]);

  const tool = new ChallengeTool();

  return (<>
      {completed && (
        <ChallengeCompletedResults timer={timer} userId={userId} challengeId={challengeId} score={scoreState.score} />
      )}
      <div
        className='absolute bottom-0 left-0 w-1/4 rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8'
        style={{transform: 'translateY(170px)'}}>
        <BoostMeter
          key={boostState.forceNewRenderKey}
          decrement={() => boostDispatch({type: 'decrement'})}
          boostState={boostState}
        />
        <ProgressBar />
        <div className='mb-4 flex items-center justify-between'>
          <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
            Current Attempt
          </h5>
        </div>
        <div className='flow-root'>
          <ul>
            <div className='bg-green-200 pl-4'>
              <li className='box-border py-3 sm:py-4'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='/test_avatar1.jpeg'
                      alt='Neil image'
                    />
                  </div>
                  <div className='ms-4 min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                      Current Attempt
                    </p>
                    <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                      {tool.formatMilliseconds(timer)}
                    </p>
                  </div>
                  <div className='box-content inline-flex w-[80px] items-center text-base font-semibold text-gray-700 dark:text-white'>
                    {scoreState.score}
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>);
}
