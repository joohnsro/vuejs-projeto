<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$app = new Silex\Application();

function getBillsPays()
{
    $json = file_get_contents(__DIR__ . '/bills-pays.json');
    $data = json_decode($json, true);
    return $data['bills-pays'];
}

function getBillsReceives()
{
    $json = file_get_contents(__DIR__ . '/bills-receives.json');
    $data = json_decode($json, true);
    return $data['bills-receives'];
}

function findBillPayIndexById($id)
{
    $bills = getBillsPays();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function findBillReceiveIndexById($id)
{
    $bills = getBillsReceives();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBillsPays($bills)
{
    $data = ['bills-pays' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills-pays.json', $json);
}

function writeBillsReceives($bills)
{
    $data = ['bills-receives' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills-receives.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills-pays', function () use ($app) {
    $bills = getBillsPays();
    return $app->json($bills);
});

$app->get('api/bills-pays/total/done', function () use ($app) {
    $bills = getBillsPays();
    $sum=0;
    foreach ($bills as $value) {
        if ($value['done'] == 1) {
            $sum += (float)$value['value'];
        }
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills-pays/total/not-done', function () use ($app) {
    $bills = getBillsPays();
    $sum=0;
    foreach ($bills as $value) {
        if ($value['done'] == 0) {
            $sum += (float)$value['value'];
        }
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills-pays/{id}', function ($id) use ($app) {
    $bills = getBillsPays();
    $bill = $bills[findBillPayIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills-pays', function (Request $request) use ($app) {
    $bills = getBillsPays();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBillsPays($bills);
    return $app->json($data);
});

$app->put('api/bills-pays/{id}', function (Request $request, $id) use ($app) {
    $bills = getBillsPays();
    $data = $request->request->all();
    $index = findBillPayIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBillsPays($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills-pays/{id}', function ($id) {
    $bills = getBillsPays();
    $index = findBillPayIndexById($id);
    array_splice($bills,$index,1);
    writeBillsPays($bills);
    return new Response("", 204);
});

$app->get('api/bills-receives', function () use ($app) {
    $bills = getBillsReceives();
    return $app->json($bills);
});

$app->get('api/bills-receives/total/done', function () use ($app) {
    $bills = getBillsReceives();
    $sum=0;
    foreach ($bills as $value) {
        if ($value['done'] == 1) {
            $sum += (float)$value['value'];
        }
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills-receives/total/not-done', function () use ($app) {
    $bills = getBillsReceives();
    $sum=0;
    foreach ($bills as $value) {
        if ($value['done'] == 0) {
            $sum += (float)$value['value'];
        }
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills-receives/{id}', function ($id) use ($app) {
    $bills = getBillsReceives();
    $bill = $bills[findBillReceiveIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills-receives', function (Request $request) use ($app) {
    $bills = getBillsReceives();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBillsReceives($bills);
    return $app->json($data);
});

$app->put('api/bills-receives/{id}', function (Request $request, $id) use ($app) {
    $bills = getBillsReceives();
    $data = $request->request->all();
    $index = findBillReceiveIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBillsReceives($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills-receives/{id}', function ($id) {
    $bills = getBillsReceives();
    $index = findBillReceiveIndexById($id);
    array_splice($bills,$index,1);
    writeBillsReceives($bills);
    return new Response("", 204);
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();