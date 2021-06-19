type State = 'loading' | 'failed' | 'success'// cannnot be used
type NetworkLoadingState = {
    state: 'loading';
}
type NetworkFailedState = {
    state: 'failed';
    code: number;
}

type NetworkSuccessState = {
    state: 'success';
    response: {
        title: string;
        duration: number;
    };
}

type NetworkState = 
    | NetworkLoadingState
    | NetworkFailedState
    | NetworkSuccessState;

function getNetworkCheckingMsg(state: NetworkState): string {
    switch (state.state) {
        case 'loading':
            return 'Downloading...'
        case 'failed':
            return `Error code:${state.code} on downloading.`
        case 'success':
            return `Success Download ${state.response.title} with ${state.response.duration}ms.`;

    }
}

export default {
    test: function() {
        const downloading: NetworkLoadingState = {
            state: 'loading'
        }
        const downloadFailed: NetworkFailedState = {
            state: 'failed',
            code: 404
        }
        const downloadSuccess: NetworkSuccessState = {
            state: 'success',
            response: {
                title: 'x-file',
                duration: 5022
            }
        }
        console.log(getNetworkCheckingMsg(downloading))
        console.log(getNetworkCheckingMsg(downloadFailed))
        console.log(getNetworkCheckingMsg(downloadSuccess))
    }
}
    