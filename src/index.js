// modified from https://gist.github.com/Kahtaf/e20515800054efcfb22830b4bc883880
//

addEventListener('fetch', event =>
	event.respondWith(handleRequest(event.request))
)

const urls = {
	'semester': {
		url: 'https://app.cc.ncku.edu.tw/api/getCurrentSem',
		options: {
			method: 'post'
		}
	}
}

const handleRequest = async request => {
	let url = new URL(request.url)
	let key = request.url.replace(`${url.origin}/`, '')
	let target = urls[key]

	if (target) {
		request = new Request(target.url, request)
		if (request.headers.has('origin')) request.headers.delete('origin')
		if (request.headers.has('referer')) request.headers.delete('referer')
	}else{
		request = new Request(key, request)
	}

	// console.log({ url: request.url, origin: url.origin })

	let response = await fetch(request, target?.options)
	response = new Response(response.body, response)
	response.headers.set('access-control-allow-origin', '*')
	response.headers.set('access-control-allow-headers', '*')

	return response
}
